#!/bin/bash

# Root of repo
ROOT_DIR=${1:-'..'}

GOMODULE_PATHS=("core/network/fabric-interop-cc/libs/utils"
"core/network/fabric-interop-cc/libs/assetexchange"
"core/network/fabric-interop-cc/interfaces/asset-mgmt"
"core/network/fabric-interop-cc/contracts/interop"
"sdks/fabric/go-sdk"
"samples/fabric/go-cli"
"samples/fabric/simpleasset"
"samples/fabric/simpleassetandinterop"
"samples/fabric/simpleassettransfer"
"samples/fabric/simplestatewithacl"
"samples/fabric/simplestate")

for GOMODULE in ${GOMODULE_PATHS[@]}; do
  echo "############# START $GOMODULE ################"
  pushd $ROOT_DIR/$GOMODULE > /dev/null
  make run-vendor || (go mod tidy && make run-vendor)
  make undo-vendor
  go mod tidy
  popd > /dev/null
  echo "############# END $GOMODULE ################\n"
done
