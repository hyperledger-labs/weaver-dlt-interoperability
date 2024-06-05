<!--
 Copyright IBM Corp. All Rights Reserved.

 SPDX-License-Identifier: CC-BY-4.0
 -->
# Migration to Cacti

If you are already familiar with the Weaver Getting Started tutorial, you can compare it with the corresponding tutorial for Weaver components within Cacti. The instructions are almost identical, with differences in the names of packages, images, and modules, either in configuration files or in public repositories.

## Repository

The entire source code of `github.com/hyperledger-labs/weaver-dlt-interoperability` (https://github.com/hyperledger-labs/weaver-dlt-interoperability) was migrated to the `weaver` folder within `github.com/hyperledger/cacti` (https://github.com/hyperledger/cacti/tree/main/weaver). As a developer/contributor, you can compare the two and note recent changes made to the latter.

## Documentation

Weaver philosophy and usage was documented in https://labs.hyperledger.org/weaver-dlt-interoperability/docs/external/introduction. The philosophy and usage of Weaver components as part of the Cacti framework are now documented in https://hyperledger.github.io/cacti/weaver/introduction/.

Users can compare the instructions for setting up test networks and testing protocols in https://labs.hyperledger.org/weaver-dlt-interoperability/docs/external/getting-started/guide with the newer Cacti version in https://hyperledger.github.io/cacti/weaver/getting-started/guide/. The instructions look very similar; only the references (URLs, package names, Docker image names, etc.) have changed.

## References: Package and Image Names

Below we list the published Weaver packages and images, and their corresponding published Cacti packages and images.

### Packages

| Type          | Module/Feature | Weaver                               | Cacti |
|---------------|-------------------------------------|----------|-------------------------------------------------------------------------|
| NPM (JavaScript & TypeScript) | Common Protobufs (JS/TS) | [@hyperledger-labs/weaver-protos-js](https://github.com/orgs/hyperledger-labs/packages/npm/package/weaver-protos-js) | [@hyperledger/cacti-weaver-protos-js](https://github.com/hyperledger/cacti/pkgs/npm/cacti-weaver-protos-js) |
|  | Node SDK for Fabric | [@hyperledger-labs/weaver-fabric-interop-sdk](https://github.com/orgs/hyperledger-labs/packages/npm/package/weaver-fabric-interop-sdk) | [@hyperledger/cacti-weaver-sdk-fabric](https://github.com/hyperledger/cacti/pkgs/npm/cacti-weaver-sdk-fabric) |
|  | Node SDK for Besu | [@hyperledger-labs/weaver-besu-interop-sdk](https://github.com/orgs/hyperledger-labs/packages/npm/package/weaver-besu-interop-sdk) | [@hyperledger/cacti-weaver-sdk-besu](https://github.com/hyperledger/cacti/pkgs/npm/cacti-weaver-sdk-besu) |
| Go | Common Protobufs (Go) | `github.com/hyperledger-labs/weaver-dlt-interoperability/common/protos-go` | `github.com/hyperledger/cacti/weaver/common/protos-go/v2` |
|  | Go SDK for Fabric | `github.com/hyperledger-labs/weaver-dlt-interoperability/sdks/fabric/go-sdk` | `github.com/hyperledger/cacti/weaver/sdks/fabric/go-sdk/v2` |
|  | Fabric Interop Chaincode | `github.com/hyperledger-labs/weaver-dlt-interoperability/core/network/fabric-interop-cc/contracts/interop` | `github.com/hyperledger/cacti/weaver/core/network/fabric-interop-cc/contracts/interop/v2` |
|  | Fabric Utils Library for Chaincode | `github.com/hyperledger-labs/weaver-dlt-interoperability/core/network/fabric-interop-cc/libs/utils` | `github.com/hyperledger/cacti/weaver/core/network/fabric-interop-cc/libs/utils/v2` |
|  | Fabric Asset Exchange Library for Chaincode | `github.com/hyperledger-labs/weaver-dlt-interoperability/core/network/fabric-interop-cc/libs/assetexchange` | `github.com/hyperledger/cacti/weaver/core/network/fabric-interop-cc/libs/assetexchange/v2` |
|  | Fabric Asset Management Interface for Chaincode | `github.com/hyperledger-labs/weaver-dlt-interoperability/core/network/fabric-interop-cc/interfaces/asset-mgmt` | `github.com/hyperledger/cacti/weaver/core/network/fabric-interop-cc/interfaces/asset-mgmt/v2` |
| Maven (Java & Kotlin) | Common Protobufs (Java/Kotlin) | [com.weaver.protos-java-kt](https://github.com/hyperledger-labs/weaver-dlt-interoperability/packages/883244) | [org.hyperledger.cacti.weaver.protos.protos-java-kt](https://github.com/hyperledger/cacti/packages/1856824) |
|  | Java/Kotlin SDK for Corda | [com.weaver.corda.sdk.weaver-corda-sdk](https://github.com/hyperledger-labs/weaver-dlt-interoperability/packages/952245) | [org.hyperledger.cacti.weaver.sdk.corda.weaver-sdk-corda](https://github.com/hyperledger/cacti/packages/1856827) |
|  | Interop CorDapp Contracts | [com.weaver.corda.app.interop.interop-contracts](https://github.com/hyperledger-labs/weaver-dlt-interoperability/packages/906215) | [org.hyperledger.cacti.weaver.imodule.corda.interop-contracts](https://github.com/hyperledger/cacti/packages/1856825) |
|  | Interop CorDapp Workflows | [com.weaver.corda.app.interop.interop-workflows](https://github.com/hyperledger-labs/weaver-dlt-interoperability/packages/906216) | [org.hyperledger.cacti.weaver.imodule.corda.interop-workflows](https://github.com/hyperledger/cacti/packages/1856826) |
| Cargo (Rust) | Common Protobufs (Rust) | [weaver_protos_rs](https://crates.io/crates/weaver_protos_rs) | [cacti_weaver_protos_rs](https://crates.io/crates/cacti_weaver_protos_rs) |

### Docker Images

| Module/Feature | Weaver                               | Cacti |
|------------------------------|----------|-------------------------------------------------------------------------|
| Relay Server | [ghcr.io/hyperledger-labs/weaver-relay-server](https://github.com/orgs/hyperledger-labs/packages/container/package/weaver-relay-server) | [ghcr.io/hyperledger/cacti-weaver-relay-server](https://github.com/hyperledger/cacti/pkgs/container/cacti-weaver-relay-server) |
| Fabric Driver | [ghcr.io/hyperledger-labs/weaver-fabric-driver](https://github.com/orgs/hyperledger-labs/packages/container/package/weaver-fabric-driver) | [ghcr.io/hyperledger/cacti-weaver-driver-fabric](https://github.com/hyperledger/cacti/pkgs/container/cacti-weaver-driver-fabric) |
| Corda Driver | [ghcr.io/hyperledger-labs/weaver-corda-driver](https://github.com/orgs/hyperledger-labs/packages/container/package/weaver-corda-driver) | [ghcr.io/hyperledger/cacti-weaver-driver-corda](https://github.com/hyperledger/cacti/pkgs/container/cacti-weaver-driver-corda) |
| IIN Agent | [ghcr.io/hyperledger-labs/weaver-iin-agent](https://github.com/orgs/hyperledger-labs/packages/container/package/weaver-iin-agent) | [ghcr.io/hyperledger/cacti-weaver-iin-agent](https://github.com/hyperledger/cacti/pkgs/container/cacti-weaver-iin-agent) |
| Fabric Interop Chaincode | [ghcr.io/hyperledger-labs/weaver-fabric-cc](https://github.com/orgs/hyperledger-labs/packages/container/package/weaver-fabric-cc) | [ghcr.io/hyperledger/cacti-weaver-imodule-fabric](https://github.com/hyperledger/cacti/pkgs/container/cacti-weaver-imodule-fabric) |

### Examples

- To deploy the Fabric Interop Chaincode in your Fabric network:
  * You would import the Weaver package `github.com/hyperledger-labs/weaver-dlt-interoperability/core/network/fabric-interop-cc/contracts/interop` (as in https://github.com/hyperledger-labs/weaver-dlt-interoperability/blob/main/tests/network-setups/fabric/dev/scripts/setupCC.sh).
  * Instead, you should now import the Cacti package `github.com/hyperledger/cacti/weaver/core/network/fabric-interop-cc/contracts/interop` (as in https://github.com/hyperledger/cacti/blob/main/weaver/tests/network-setups/fabric/dev/scripts/setupCC.sh)

- To deploy the Corda Driver in your Corda network:
  * You would pull the Weaver Docker image `ghcr.io/hyperledger-labs/weaver-corda-driver` (as in https://github.com/hyperledger-labs/weaver-dlt-interoperability/blob/main/core/drivers/corda-driver/docker-testnet-envs/.env.corda)
  * Instead, you should now import the Cacti Docker image `ghcr.io/hyperledger/cacti-weaver-driver-corda` (as in https://github.com/hyperledger/cacti/blob/main/weaver/core/drivers/corda-driver/docker-testnet-envs/.env.corda)

- To import the Fabric Interop Node SDK in your JavaScript/TypeScript application:
  * You would import the Weaver library `@hyperledger-labs/weaver-fabric-interop-sdk` (as in https://github.com/hyperledger-labs/weaver-dlt-interoperability/blob/main/samples/fabric/fabric-cli/src/helpers/interop-setup/configure-network.ts)
  * Instead, you should now import the Cacti library `@hyperledger/cacti-weaver-sdk-fabric` (as in https://github.com/hyperledger/cacti/blob/main/weaver/samples/fabric/fabric-cli/src/helpers/interop-setup/configure-network.ts)

- To import the Fabric Utils Library in your chaincode:
  * You would import the Weaver package `github.com/hyperledger-labs/weaver-dlt-interoperability/core/network/fabric-interop-cc/libs/utils` (as in https://github.com/hyperledger-labs/weaver-dlt-interoperability/blob/main/samples/fabric/simpleassettransfer/bondasset.go)
  * Instead, you should now import the Cacti package `github.com/hyperledger/cacti/weaver/core/network/fabric-interop-cc/libs/utils`, suffixed with the appropriate version (as in https://github.com/hyperledger/cacti/blob/main/weaver/samples/fabric/simpleassettransfer/bondasset.go)

- To deploy the Interop CorDapp contracts in your Corda network:
  * You would fetch the Weaver package `https://maven.pkg.github.com/hyperledger-labs/weaver-dlt-interoperability/com/weaver/corda/app/interop/interop-contracts/<version> (as in https://github.com/hyperledger-labs/weaver-dlt-interoperability/blob/main/tests/network-setups/corda/github.properties.template and https://github.com/hyperledger-labs/weaver-dlt-interoperability/blob/main/tests/network-setups/corda/scripts/get-cordapps.sh)
  * Instead, you should now fetch the Cacti package `https://maven.pkg.github.com/hyperledger/cacti/org/hyperledger/cacti/weaver/imodule/corda/interop-contracts/<version>` (as in https://github.com/hyperledger/cacti/blob/main/weaver/tests/network-setups/corda/github.properties.template and https://github.com/hyperledger/cacti/blob/main/weaver/tests/network-setups/corda/scripts/get-cordapps.sh)
