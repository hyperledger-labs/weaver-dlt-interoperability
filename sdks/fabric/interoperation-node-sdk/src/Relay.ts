/**
 * Relay file includes the class and methods to communicate with a relay over grpc.
 **/
/** End file docs */
import * as grpcJs from "@grpc/grpc-js";
import networksGrpcPb from "../protos-js/networks/networks_grpc_pb";
import networksPb from "../protos-js/networks/networks_pb";
import common_ack_pb from "../protos-js/common/ack_pb";
import statePb from "../protos-js/common/state_pb";
import * as helpers from "./helpers";
/**
 * The Relay class represents a relay in the target blockchain network.
 */
class Relay {
    timeoutTime = 3000;
    _endPoint = "";
    /**
     * Construct a Relay object with the given url. A Relay object
     * encapsulates the properties of a Relay and the interactions with it
     * via gRPC.
     *
     * @param {string} url - The URL with format of "http(s)://host:port".
     * @returns {Relay} The Relay instance.
     */
    constructor(endPoint: string, timeoutTime = 30000) {
        if (!endPoint) {
            throw new Error("Invalid Arguments");
        }
        this.timeoutTime = timeoutTime;
        // eslint-disable-next-line
        this._endPoint = endPoint;
    }

    /**
     * Get the endpoint for this object.
     * @returns {string} The endpoint of the object
     */
    getEndpoint(): string {
        // eslint-disable-next-line
        return this._endPoint;
    }

    /**
     * SendRequest to send a request to a remote network using gRPC and the relay.
     * @returns {string} The ID of the request
     */
    async SendRequest(
        address: string,
        policy,
        requestingNetwork: string,
        certificate: string,
        signature: string,
        nonce: string,
        org: string,
    ): Promise<string> {
        try {
            const networkClient = new networksGrpcPb.NetworkClient(
                this.getEndpoint(),
                grpcJs.credentials.createInsecure(),
            );
            const {
                requestState,
            }: {
                requestState: (query: networksPb.NetworkQuery) => Promise<common_ack_pb.Ack>;
            } = helpers.promisifyAll(networkClient);

            const query = new networksPb.NetworkQuery();
            query.setPolicyList(policy);
            query.setAddress(address);
            query.setCertificate(certificate);
            query.setNonce(nonce);
            query.setRequestorSignature(signature);
            query.setRequestingRelay("");
            query.setRequestingNetwork(requestingNetwork);
            query.setRequestingOrg(org || "");
            if (typeof requestState === "function") {
                const [resp, error] = await helpers.handlePromise(requestState(query));
                if (error) {
                    throw new Error(`Request state error: ${error}`);
                }
                return resp.getRequestId();
            }
            throw new Error("Error with requeststate in NetworkClient");
        } catch (e) {
            throw new Error(`Error with Network Client: ${e}`);
        }
    }

    /**
     * ProcessRequest sends a request to a remote network using gRPC and the relay and polls for a response on the local network
     * Uses the timeout provided by the class.
     * @returns {string} The state returned by the remote request
     */
    async ProcessRequest(
        address: string,
        policy,
        requestingNetwork: string,
        certificate: string,
        signature: string,
        nonce: string,
        org: string,
    ): Promise<any> {
        try {
            const [requestID, error] = await helpers.handlePromise(
                this.SendRequest(address, policy, requestingNetwork, certificate, signature, nonce, org),
            );
            if (error) {
                throw new Error(`Request state error: ${error}`);
            }
            // Adds timout time to current time.
            const dateObj = new Date();
            dateObj.setMilliseconds(dateObj.getMilliseconds() + this.timeoutTime);
            //TODO: SLOW DOWN
            const [finalState, stateError] = await helpers.handlePromise(this.recursiveState(requestID, dateObj));
            if (stateError) {
                throw new Error(`State error: ${stateError}`);
            }
            if (finalState.getError()) {
                throw new Error(`Error from view payload : ${finalState.getError()}`);
            }
            return finalState;
        } catch (e) {
            throw new Error(e);
        }
    }

    async recursiveState(requestID: string, dateObj: Date): Promise<any> {
        const [state, error] = await helpers.handlePromise(this.GetRequest(requestID, false));
        if (error) {
            throw new Error(`Request state error: ${error}`);
        }
        if (
            state.getStatus() === statePb.RequestState.STATUS.PENDING ||
            state.getStatus() === statePb.RequestState.STATUS.PENDING_ACK
        ) {
            if (dateObj.getTime() < Date.now()) {
                throw new Error("Timeout: State is still pending.");
            } else {
                return this.recursiveState(requestID, dateObj);
            }
        } else {
            return state;
        }
    }

    /**
     * GetRequest is used to get the request from the local network
     * @returns {object} The request object from the relay
     */
    async GetRequest(requestId: string, asJson = true): Promise<any> {
        const networkClient = new networksGrpcPb.NetworkClient(this.getEndpoint(), grpcJs.credentials.createInsecure());
        const {
            getState,
        }: { getState: (message: networksPb.GetStateMessage) => Promise<statePb.RequestState> } = helpers.promisifyAll(
            networkClient,
        );
        const getStateMessage = new networksPb.GetStateMessage();
        getStateMessage.setRequestId(requestId);
        const [state, error] = await helpers.handlePromise(getState(getStateMessage));
        if (error) {
            throw new Error(`Error: ${error}`);
        }

        return asJson ? state.toObject() : state;
    }
}

export { Relay };
