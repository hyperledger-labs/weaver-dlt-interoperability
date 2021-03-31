# Corda Network

This folder contains the shared configuration for setting up the Corda network
containing the Interoperability CorDapp and Test CorDapp application.

The top level folder contains various configuration file for multiple
environment. The `artifacts` folder is a placeholder for the binaries (simple
application CorDapp and interoperation CorDapp) that are to be deployed in the
network.

Necessary information includes:

1. `build.gradle` file as Corda has gradle plugins that automate the process of
   creating all the artifacts necessary for the nodes (certs, network maps, the
   `corda.jar`, etc.).
2. (TODO) A config file for ports and paths for the Corda nodes (in case
   developers need to update them for their machine)
3. Keystore files so that certificates for the Corda nodes can be the
   same on all developers' laptops (this will be useful later down the line when
   we start developing proof generation and proof verification systems that
   require digital signatures, and doing encryption). The certificates are
   located in the `credentials` folder and get copied into the `build/nodes`
   folder as a part of the `generate.sh` script.
4. The network map for Corda containing the certificates of the nodes and the
   issuing CAs up to the network root CA. This is located in
   `credentials/CordaNetworkMap.json`. 5. Scripts for:

-   Bringing up the network (default is to use CorDapps from Artifactory - but
    there is an option for local copies of CorDapps)
-   Pulling in latest copies of CorDapps and starting nodes
-   Populating the network with dummy data

## Requirements

The simple state and interoperation CorDapps can be sourced either from the
local file system or from Artifactory.

For local versions, the `get-cordapps` script assumes that _a)_ the repositories
for these are at the same directory level as the `networks-setup` repository,
and _b)_ that the cordapp executables have been built in those repos. The
required CorDapps are in
[corda-simple-application](../../../../samples/corda-simple-application) and
[corda-interop-app](../../../../core/network/corda-interop-app)
and the instructions for building these projects can be found in their
respective repos.

To get the CorDapps from Artifactory you will need to have permission to do so
. Copy the `artifactory.properties.template`
file as `artifactory.properties` and replace placeholders with your IBM email
and Artifactory API key (found on your profile at
https://na.artifactory.swg-devops.com/artifactory/).

## Running with Make

If you are happy with the default configuration, you can use the following make
targets.

-   `make start` builds the required node folder structure for the nodes to run,
    gets the CorDapps from Artifactory, then starts the Corda nodes.
-   `make start-local` is the same as `make start` except it gets the cordapps
    from locally built jars from the `corda-simple-app` and `corda-interop-app`
    repositories.
-   `make restart-with-new-interop-app` can be used to restart an already running
    Corda network with new local versions of the `corda-interop-app` CorDapp.
-   `make stop` stops the nodes.
-   `make clean` stops the nodes and deletes the build artifacts.

## Interacting with the nodes

The [corda-simple-application](../../../../samples/corda-simple-application)
repository includes a client application for interacting with the CorDapps
running on the Corda nodes. Please see this repository for further information
on how to use it.

## Scripts for running and updating the network during local development

If the nodes need to be restarted with new versions of the CorDapps, the nodes
need to first be brought down with:

```
make stop
```

To copy the local CorDapps into the `artifacts` directory, run:

```
./scripts/get-cordapps.sh local
```

Start the nodes with:

```
./scripts/start-nodes.sh
```

This script copies the interoperation and simple state CorDapps
from `artifacts` into the CorDapp folder of the nodes. It then uses
docker-compose to start the Corda nodes in containers.

## Restarting the nodes after changing the interop workflows cordapp

A script has been make to automate the process of restarting the nodes after
changes are made in the `corda-interop-app` repo. To run it, use:

```
make restart-with-new-interop-app
```

## Changing the CorDapp and client versions

To change the version number of the Simple State and Interoperation CorDapps,
the following files need to be updated:

-   `scripts/start-nodes` version number at top of file
-   `scripts/initialise-vault` version number at top of file
-   `scripts/get-cordapps` version number at top of file

Also make sure to delete old versions from the `artifacts` folder.

## Printing the node certificates

```
keytool -list -rfc -keystore nodekeystore.jks -storepass cordacadevpass -alias cordaclientca
```

## TODO

-   Move the node addresses out of the `build.gradle` file into a separate config
    file.
-   Create the network topology file that can be used by other networks to
    authenticate Corda nodes and verify Corda state proofs.
