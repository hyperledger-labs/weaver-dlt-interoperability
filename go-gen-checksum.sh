#!/bin/bash

# Root of repo
ROOT_DIR='.'

# Repo full go path
REPO='github.com/hyperledger-labs/weaver-dlt-interoperability'

VERSION=$1

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
  echo $GOMODULE
  pushd $ROOT_DIR/$GOMODULE
  GOMOD_DEPS=$((go mod graph | grep "$REPO/$GOMODULE $REPO" | cut -d ' ' -f 2) || (echo "ERROR: In generating dependency graph" && exit 1))
  popd

  for GOMOD_DEP in ${GOMOD_DEPS[@]}; do
    echo "--------- START DEP -----------"
    GOMOD_PATH=$(echo $GOMOD_DEP | cut -d '@' -f 1 | awk -F "$REPO/" '{print $2}')
    echo "DEP: $GOMOD_DEP"
    echo "DEP: $GOMOD_PATH"
    cp $ROOT_DIR/LICENSE $ROOT_DIR/$GOMOD_PATH
    pushd $ROOT_DIR/$GOMOD_PATH
    GOMOD_NAME="$REPO/$GOMOD_PATH"
    if [ ! -f VERSION ]; then
      echo "INFO: VERSION absent"
      popd
      echo "------------ END --------------"
      continue
    fi
    
    (cat VERSION | grep "$VERSION") || echo $VERSION > VERSION
    
    GOMOD_VERSION=v$(cat VERSION)
    GOMOD_SUM=$(go-checksum . $GOMOD_NAME@$GOMOD_VERSION | grep "GoCheckSum" | cut -d ' ' -f 2 | cut -d '"' -f 2)
    GOMOD_DOTMOD_SUM=$(go-checksum go.mod | grep "GoCheckSum" | cut -d ' ' -f 2 | cut -d '"' -f 2)
    GOMOD_SUM_ENTRY="$GOMOD_NAME $GOMOD_VERSION $GOMOD_SUM"
    GOMOD_DOTMOD_SUM_ENTRY="$GOMOD_NAME $GOMOD_VERSION/go.mod $GOMOD_DOTMOD_SUM"
    echo "----"
    echo "GOSUM: $GOMOD_SUM_ENTRY"
    echo "GOSUM: $GOMOD_DOTMOD_SUM_ENTRY"
    echo "----"
    popd
    rm $ROOT_DIR/$GOMOD_PATH/LICENSE
    
    pushd $ROOT_DIR/$GOMODULE
    UPDATE=false
    (cat go.mod | grep -q "$GOMOD_NAME $GOMOD_VERSION") || UPDATE=True
    if $UPDATE; then
      go mod edit -require $GOMOD_NAME@$GOMOD_VERSION
    else
      echo "ERROR: Version $GOMOD_VERSION already there in go.mod, skipping $GOMOD_PATH in $GOMODULE"
    fi
    UPDATE=false
    (cat go.sum | grep -q "$GOMOD_SUM_ENTRY") || UPDATE=True
    (cat go.sum | grep -q "$GOMOD_DOTMOD_SUM_ENTRY") || UPDATE=True
    if $UPDATE; then
      # mv go.sum go.sum.old
      # grep -v "$GOMOD_NAME $GOMOD_VERSION" go.sum.old > go.sum
      echo "$GOMOD_SUM_ENTRY" >> go.sum
      echo "$GOMOD_DOTMOD_SUM_ENTRY" >> go.sum
    else
      echo "ERROR: Version $GOMOD_VERSION already there in go.sum, skipping $GOMOD_PATH in $GOMODULE"
    fi
    popd
    echo "------------ END --------------"
  done
  echo "############# END $GOMODULE ################\n"
done

