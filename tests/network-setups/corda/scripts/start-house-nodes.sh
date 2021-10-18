#!/bin/bash

directory=$(dirname $0)
houseTokenAppversion="1.0"
weaverVersion="1.2.4-alpha.3"
tokenVersion="1.2"

cp $directory/../shared/artifacts/contracts-$houseTokenAppversion.jar build/nodes/Notary/cordapps
cp $directory/../shared/artifacts/contracts-$houseTokenAppversion.jar build/nodes/PartyA/cordapps
cp $directory/../shared/artifacts/contracts-$houseTokenAppversion.jar build/nodes/PartyB/cordapps
cp $directory/../shared/artifacts/workflows-$houseTokenAppversion.jar build/nodes/Notary/cordapps
cp $directory/../shared/artifacts/workflows-$houseTokenAppversion.jar build/nodes/PartyA/cordapps
cp $directory/../shared/artifacts/workflows-$houseTokenAppversion.jar build/nodes/PartyB/cordapps

cp $directory/../shared/artifacts/tokens-contracts-$tokenVersion.jar build/nodes/Notary/cordapps
cp $directory/../shared/artifacts/tokens-contracts-$tokenVersion.jar build/nodes/PartyA/cordapps
cp $directory/../shared/artifacts/tokens-contracts-$tokenVersion.jar build/nodes/PartyB/cordapps
cp $directory/../shared/artifacts/tokens-workflows-$tokenVersion.jar build/nodes/Notary/cordapps
cp $directory/../shared/artifacts/tokens-workflows-$tokenVersion.jar build/nodes/PartyA/cordapps
cp $directory/../shared/artifacts/tokens-workflows-$tokenVersion.jar build/nodes/PartyB/cordapps

cp $directory/../shared/artifacts/interop-contracts-$weaverVersion.jar build/nodes/Notary/cordapps
cp $directory/../shared/artifacts/interop-contracts-$weaverVersion.jar build/nodes/PartyA/cordapps
cp $directory/../shared/artifacts/interop-contracts-$weaverVersion.jar build/nodes/PartyB/cordapps
cp $directory/../shared/artifacts/interop-workflows-$weaverVersion.jar build/nodes/Notary/cordapps
cp $directory/../shared/artifacts/interop-workflows-$weaverVersion.jar build/nodes/PartyA/cordapps
cp $directory/../shared/artifacts/interop-workflows-$weaverVersion.jar build/nodes/PartyB/cordapps

cp $directory/../shared/artifacts/protos-java-kt-$weaverVersion.jar build/nodes/Notary/cordapps
cp $directory/../shared/artifacts/protos-java-kt-$weaverVersion.jar build/nodes/PartyA/cordapps
cp $directory/../shared/artifacts/protos-java-kt-$weaverVersion.jar build/nodes/PartyB/cordapps

docker-compose up -d
docker ps -a
#docker logs corda_partya_1 -f
