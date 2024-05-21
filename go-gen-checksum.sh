#!/bin/bash

# Root of repo
ROOT_DIR='.'

# Repo full go path
# REPO='github.com/hyperledger/cacti'
REPO='github.com/hyperledger-labs/weaver-dlt-interoperability'


GOMODULE_PATHS=("core/network/fabric-interop-cc/libs/utils"
"core/network/fabric-interop-cc/libs/assetexchange"
"core/network/fabric-interop-cc/interfaces/asset-mgmt"
"core/network/fabric-interop-cc/contracts/interop")

for GOMODULE in ${GOMODULE_PATHS[@]}; do
  echo "!!!!! START !!!!!!!"
  echo $GOMODULE
  pushd $ROOT_DIR/$GOMODULE
  GOMOD_DEPS=$(go mod graph | grep "$REPO/$GOMODULE $REPO" | cut -d ' ' -f 2)
  cp go.sum go.sum.bkp
  popd

  for GOMOD_DEP in ${GOMOD_DEPS[@]}; do
    echo "######## START MOD DEP ############"
    GOMOD_PATH=$(echo $GOMOD_DEP | cut -d '@' -f 1 | awk -F "$REPO/" '{print $2}')
    echo $GOMOD_DEP
    echo $GOMOD_PATH
    cp $ROOT_DIR/LICENSE $ROOT_DIR/$GOMOD_PATH
    pushd $ROOT_DIR/$GOMOD_PATH
    GOMOD_NAME="$REPO/$GOMOD_PATH"
    if [ ! -f VERSION ]; then
      echo "VERSION absent"
      popd
      echo "######## END ############"
      continue
    fi
    GOMOD_VERSION=v$(cat VERSION)
    GOMOD_SUM=$(go-checksum . $GOMOD_NAME@$GOMOD_VERSION | grep "GoCheckSum" | cut -d ' ' -f 2 | cut -d '"' -f 2)
    GOMOD_DOTMOD_SUM=$(go-checksum go.mod | grep "GoCheckSum" | cut -d ' ' -f 2 | cut -d '"' -f 2)
    GOMOD_SUM_ENTRY="$GOMOD_NAME $GOMOD_VERSION $GOMOD_SUM"
    GOMOD_DOTMOD_SUM_ENTRY="$GOMOD_NAME $GOMOD_VERSION/go.mod $GOMOD_DOTMOD_SUM"
    echo "----"
    echo $GOMOD_SUM_ENTRY
    echo $GOMOD_DOTMOD_SUM_ENTRY
    echo "----"
    popd
    rm $ROOT_DIR/$GOMOD_PATH/LICENSE
    
    pushd $ROOT_DIR/$GOMODULE
    go mod edit -require $GOMOD_NAME@$GOMOD_VERSION
    # mv go.sum go.sum.old
    # grep -v "$GOMOD_NAME $GOMOD_VERSION" go.sum.old > go.sum
    echo $GOMOD_SUM_ENTRY >> go.sum
    echo $GOMOD_DOTMOD_SUM_ENTRY >> go.sum
    popd
    echo "######## END ############"
  done
  echo "!!!!! END !!!!!!!"
done

