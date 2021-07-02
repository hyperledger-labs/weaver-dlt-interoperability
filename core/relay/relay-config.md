<!--
 Copyright IBM Corp. All Rights Reserved.

 SPDX-License-Identifier: CC-BY-4.0
 -->
# Creating Relay Config file

Samples are present in [relay/config](./relay/config) directory. \
Define environment variable `RELAY_CONFIG`, which stores path to the relay config file.

## Components Overview

* **name**: Name of the relay. e.g. `Fabric_Relay`
* **port**: Port number for relay grpc server. e.g. `9080`
* **hostname**: Hostname for grpc server. e.g. `0.0.0.0`
* **db_path** and **remote_db_path**: Not required to change, can use Relay name in the path, to uniquely identify path per relay.
* **[networks]**: Define list of networks to which this relay will act as local relay. \
    Format:
    ```
    [networks]
    [networks.<network-name>]
    network=<driver-name>
    ```
    `<network-name>`: Should match the network name used in relay call and view addresses. \
    `<driver-name>`: Should match with the driver name to be used in **[drivers]** section. \
    e.g.:
    ```
    [networks]
    [networks.network1]
    network="Fabric"
    [networks.Corda_Network]
    network="Corda"
    ```
* **[relays]**: Define list of all remote relays to which this relay can/should communicate with. \
    Format: 
    ```
    [relays]
    [relays.<relay-name>]
    hostname="<relay-hostname>"
    port="<relay-port>"
    ```
    `<relay-name>`: Should match with the relay name used in remote relay's config. \
    `<relay-hostname>`: Hostname for the remote relay. \
    `<relay-port`: Port for the remote relay. \
    e.g.:
    ```
    [relays]
    [relays.Corda_Relay]
    hostname="localhost"
    port="9081"
    [relays.Fabric_Relay2]
    hostname="localhost"
    port="9083"
    ```
* **[drivers]**: Define list of drivers that this relay is supposed to communicate with. \
    Format: 
    ```
    [drivers]
    [drivers.<driver-name>]
    hostname="<driver-hostname>"
    port="<driver-port>"
    ```
    `<driver-name>`: Should match with the one of the driver names used in **[networks]** list. \
    `<driver-hostname>`: Hostname for the driver. \
    `<driver-port`: Port for the driver. \
    e.g.:
    ```
    [drivers]
    [drivers.Fabric]
    hostname="localhost"
    port="9090"
    [drivers.Corda]
    hostname="localhost"
    port="9099"
    ```
    **Note**: `<driver-name>` has nothing to do with anything related to driver's configuration. It is solely used in relay only.
    
* **TLS**: To enable TLS, add:
    ```
    cert_path="<tls_cert_path>"
    key_path="<tls_private_key"
    tls=true
    ```
    
    