// Internal generated modules
use crate::pb::common::ack::{ack, Ack};
use crate::pb::common::query::Query;
use crate::pb::common::state::{request_state, view_payload, RequestState, ViewPayload};
use crate::pb::driver::driver::driver_communication_client::DriverCommunicationClient;
use crate::pb::relay::datatransfer::data_transfer_client::DataTransferClient;
use crate::pb::relay::datatransfer::data_transfer_server::DataTransfer;
// Internal modules
use crate::db::Database;
use crate::error::Error;
use crate::relay_proto::{parse_address, LocationSegment};
// external modules
use config;
use serde;
use tokio::sync::RwLock;
use tonic::{Request, Response, Status};

pub struct DataTransferService {
    pub config_lock: RwLock<config::Config>,
}
#[derive(Clone, PartialEq, serde::Serialize, serde::Deserialize, Debug)]
pub struct Driver {
    port: String,
    hostname: String,
}

#[derive(Clone, PartialEq, serde::Serialize, serde::Deserialize, Debug)]
pub struct Network {
    network: String,
}

/// DataTransferService is the gRPC server implementation that handles the logic for
/// communication of the data transfer protocol between two relays.
#[tonic::async_trait]
impl DataTransfer for DataTransferService {
    /// request_state is run on the remote relay to retrieve the state that was
    /// requested from the requesting relay
    async fn request_state(&self, request: Request<Query>) -> Result<Response<Ack>, Status> {
        println!(
            "Got a Query request from {:?} - {:?}",
            request.remote_addr(),
            request
        );
        let query = request.into_inner().clone();
        let request_id = query.request_id.to_string();
        let conf = self.config_lock.read().await;
        // Database access/storage
        let remote_db = Database {
            db_path: conf.get_str("remote_db_path").unwrap(),
        };
        match request_state_helper(remote_db, request_id.to_string(), query, conf.clone()) {
            Ok(ack) => {
                let reply = Ok(Response::new(ack));
                println!("Sending back Ack: {:?}\n", reply);
                reply
            }
            Err(e) => {
                println!("Requesting State from Driver failed.");
                let reply = Ok(Response::new(Ack {
                    status: ack::Status::Error as i32,
                    request_id,
                    message: format!("Error: Requesting State from Driver failed. {:?}", e),
                }));
                println!("Sending back Ack: {:?}\n", reply);
                reply
            }
        }
    }

    /// send_driver_state is run on the remote relay. Run when the driver sends the state back to the remote relay
    async fn send_driver_state(
        &self,
        request: Request<ViewPayload>,
    ) -> Result<Response<Ack>, Status> {
        let state = request.into_inner().clone();
        println!("Received State from driver: {:?}", state.clone());
        let request_id = state.request_id.to_string();
        let conf = self.config_lock.read().await;
        // Database access/storage
        let remote_db = Database {
            db_path: conf.get_str("remote_db_path").unwrap(),
        };

        let result =
            send_driver_state_helper(request_id.to_string(), remote_db, conf.clone(), state);
        match result {
            Ok(resp) => {
                let reply = Ok(resp);
                println!("Sending back Ack to driver: {:?}\n", reply);
                return reply;
            }
            Err(e) => {
                // NOTE: No way to send another state to Relay, if it reaches this error the next will also error.
                let reply = Ok(Response::new(Ack {
                    status: ack::Status::Error as i32,
                    request_id: request_id.to_string(),
                    message: format!("Error: {:?}", e),
                }));
                println!("Sending back Ack to driver: {:?}\n", reply);
                return reply;
            }
        }
    }
    /// send_state is run on the requesting relay when a remote relay sends a result back to the requesting relay
    async fn send_state(&self, request: Request<ViewPayload>) -> Result<Response<Ack>, Status> {
        let request_view_payload = request.into_inner().clone();
        println!(
            "Received state from remote relay: {:?}",
            request_view_payload
        );
        let request_id = &request_view_payload.request_id.to_string();
        let conf = self.config_lock.read().await.clone();
        // Database access/storage
        let db = Database {
            db_path: conf.get_str("db_path").unwrap(),
        };
        let result = send_state_helper(request_view_payload.state, request_id.to_string(), db);

        match result {
            Ok(_) => println!("Successfully set state in DB."),
            Err(e) => println!("Setting value in DB failed: {:?}", e),
        }
        let reply = Ok(Response::new(Ack {
            status: ack::Status::Ok as i32,
            request_id: request_id.to_string(),
            message: "".to_string(),
        }));
        println!("Sending back Ack to remote relay: {:?}", reply);
        reply
    }
}

/// send_state is run on the requesting relay when a remote relay sends a result back to the requesting relay
fn send_state_helper(
    state: Option<view_payload::State>,
    request_id: String,
    db: Database,
) -> Result<(), Error> {
    match state {
        Some(data) => match data {
            view_payload::State::View(payload) => {
                let target: RequestState = RequestState {
                    status: request_state::Status::Completed as i32,
                    request_id: request_id.to_string(),
                    state: Some(request_state::State::View(payload)),
                };
                let _ = db.set(&request_id.to_string(), &target)?;
                println!(
                    "Stored ViewPayload into db with request_id: {}",
                    request_id.to_string()
                );
            }
            view_payload::State::Error(error) => {
                let target: RequestState = RequestState {
                    status: request_state::Status::Error as i32,
                    request_id: request_id.to_string(),
                    state: Some(request_state::State::Error(error)),
                };
                let _ = db.set(&request_id.to_string(), &target)?;
                println!(
                    "Stored Error into db with request_id: {}",
                    request_id.to_string()
                );
            }
        },
        None => {
            let target: RequestState = RequestState {
                status: request_state::Status::Error as i32,
                request_id: request_id.to_string(),
                state: Some(request_state::State::Error("Missing state".to_string())),
            };
            let _ = db.set(&request_id.to_string(), &target)?;
            println!(
                "Stored Error into db with request_id: {}",
                request_id.to_string()
            );
        }
    };

    return Ok(());
}

/// request_state is run on the remote relay to retrieve the state that was
/// requested from the requesting relay
fn request_state_helper(
    remote_db: Database,
    request_id: String,
    query: Query,
    conf: config::Config,
) -> Result<Ack, Error> {
    let _set_query = remote_db
        .set(&request_id.to_string(), &query)
        .map_err(|e| Error::Simple(format!("DB Failure: {:?}", e)))?;
    let parsed_address = parse_address(query.address.to_string())?;
    // get the driver type from the networks map
    let networks_table = conf
        .get_table("networks")
        .map_err(|e| Error::Simple(format!("Unable to find networks table. Error: {:?}", e)))?;
    let network_table = networks_table
        .get::<String>(&parsed_address.network_id.to_string())
        .ok_or(Error::Simple(format!(
            "Unable to find Network_id \"{}\" in config",
            parsed_address.network_id.to_string()
        )))?;
    let network_type = network_table
        .clone()
        .try_into::<Network>()
        .expect("Error in config file networks table")
        .clone();
    // get the driver host:port from the drivers map
    let drivers_table = conf
        .get_table("drivers")
        .map_err(|e| Error::Simple(format!("Unable to find driver table. Error: {:?}", e)))?;
    let driver_table = drivers_table
        .get::<String>(&network_type.network)
        .ok_or(Error::Simple(format!(
            "Unable to find driver port for network: {}",
            parsed_address.network_id.to_string()
        )))?;
    let driver_info = driver_table
        .clone()
        .try_into::<Driver>()
        .expect("Error in config file drivers table")
        .clone();
    let port = driver_info.port.to_string();
    let hostname = driver_info.hostname.to_string();
    let driver_address = format!("http://{}:{}", hostname, port);
    spawn_request_driver_state(query, driver_address.to_string(), conf.clone());
    return Ok(Ack {
        status: ack::Status::Ok as i32,
        request_id,
        message: "".to_string(),
    });
}

/// send_driver_state is run on the remote relay. Runs when the driver sends the
/// state back to the remote relay or if there was an error making the
/// request_driver_state gRPC call.
fn send_driver_state_helper(
    request_id: String,
    remote_db: Database,
    conf: config::Config,
    state: ViewPayload,
) -> Result<Response<Ack>, Error> {
    let query: Query = remote_db
        .get::<Query>(request_id.to_string())
        .map_err(|e| Error::GetQuery(format!("Failed to get query from db. Error: {:?}", e)))?;
    let relays_table = conf.get_table("relays")?;
    let relay_uri = relays_table
        .get(&query.requesting_relay.to_string())
        .ok_or(Error::Simple("Relay name not found".to_string()))?;
    let uri = relay_uri.clone().try_into::<LocationSegment>()?;
    spawn_send_state(
        state,
        format!("{}:{}", uri.hostname.to_string(), uri.port.to_string()),
    );
    let reply = Ack {
        status: ack::Status::Ok as i32,
        request_id,
        message: "".to_string(),
    };

    return Ok(Response::new(reply));
}

async fn spawn_request_driver_state_helper(
    query: Query,
    driver_address: String,
) -> Result<(), Error> {
    let client = DriverCommunicationClient::connect(driver_address).await?;
    println!("Sending request to driver with query {:?}", query.clone());
    let ack = client
        .clone()
        .request_driver_state(query)
        .await?
        .into_inner();
    println!("Response ACK from driver={:?}\n", ack);
    let status = ack::Status::from_i32(ack.status)
        .ok_or(Error::Simple("Status from Driver error".to_string()))?;
    match status {
        ack::Status::Ok => {
            // Do nothing
            return Ok(());
        }
        ack::Status::Error => Err(Error::Simple(format!("Error from driver: {}", ack.message))),
    }
}

// Function that starts a thread which sends the query information to the driver
fn spawn_request_driver_state(query: Query, driver_address: String, conf: config::Config) {
    tokio::spawn(async move {
        let result = spawn_request_driver_state_helper(query.clone(), driver_address).await;
        match result {
            Ok(_) => {
                // Do nothing
                println!("Ack Ok from driver\n")
            }
            Err(e) => {
                println!("Error sending query to driver: {:?}\n", e);
                // In Error case we send an error_state to requesting relay.
                let request_id = query.request_id.to_string();
                // Database access/storage
                let remote_db = Database {
                    db_path: conf.get_str("remote_db_path").unwrap(),
                };
                let error_state = ViewPayload {
                    request_id: query.request_id.to_string(),
                    state: Some(view_payload::State::Error(format!("Driver Error: {:?}", e))),
                };
                let result = send_driver_state_helper(
                    request_id.to_string(),
                    remote_db,
                    conf.clone(),
                    error_state,
                );
                match result {
                    Ok(_) => {
                        println!(
                            "Send_Driver_Data error successfully sent back to requesting relay"
                        );
                    }
                    Err(e) => println!("Error sending state: {:?}", e),
                }
            }
        }
    });
}

// spawn_send_state sends data from the remote relay back to the requesting relay
// When it errors it currently logs to console. Needs improving
fn spawn_send_state(state: ViewPayload, requester_port: String) {
    tokio::spawn(async move {
        println!("Sending state back to requesting relay: {:?}", state);
        let client_addr = format!("http://{}", requester_port);
        let client_result = DataTransferClient::connect(client_addr).await;
        match client_result {
            Ok(client) => {
                let response = client.clone().send_state(state).await;
                println!("Response ACK from requesting relay={:?}\n", response);
                // Not returning anything here
            }
            Err(e) => {
                // TODO: Add better error handling (Attempt a few times?)
                println!(
                    "Failed to connect to client: ${:?}. Error: {}\n",
                    requester_port,
                    e.to_string()
                );
                // TODO: Handle this error thorugh join handle after thread completes.
                // Not actually returning anything here yet
            }
        }
    });
}
