#!/bin/bash

directory=$(dirname $0)
simpleAppVersion="0.4"
interopAppVersion="0.6"

if [[ $1 == "local" ]]; then
  cp $directory/../../../../../samples/corda-simple-application/contracts-kotlin/build/libs/contracts-kotlin-$simpleAppVersion.jar $directory/../artifacts
  cp $directory/../../../../../samples/corda-simple-application/workflows-kotlin/build/libs/workflows-kotlin-$simpleAppVersion.jar $directory/../artifacts

  cp $directory/../../../../../core/network/corda-interop-app/interop-contracts/build/libs/interop-contracts-$interopAppVersion.jar $directory/../artifacts
  cp $directory/../../../../../core/network/corda-interop-app/interop-workflows/build/libs/interop-workflows-$interopAppVersion.jar $directory/../artifacts
else
  file="$directory/../../artifactory.properties"
  if [ -f $file ]; then
    echo Downloading CorDapps from Artifactory...
    username=`sed '/^\#/d' $file | grep 'username=' | cut -d "=" -f2-`
    password=`sed '/^\#/d' $file | grep 'password=' | cut -d "=" -f2-`
    (cd $directory/../artifacts && curl -u $username:$password -O https://na.artifactory.swg-devops.com:443/artifactory/res-dlt-interop-maven-local/com/cordaInteropApp/interop-contracts/$interopAppVersion/interop-contracts-$interopAppVersion.jar)
    (cd $directory/../artifacts && curl -u $username:$password -O https://na.artifactory.swg-devops.com:443/artifactory/res-dlt-interop-maven-local/com/cordaInteropApp/interop-workflows/$interopAppVersion/interop-workflows-$interopAppVersion.jar)
    (cd $directory/../artifacts && curl -u $username:$password -O https://na.artifactory.swg-devops.com:443/artifactory/res-dlt-interop-maven-local/com/cordaSimpleApplication/contracts-kotlin/$simpleAppVersion/contracts-kotlin-$simpleAppVersion.jar)
    (cd $directory/../artifacts && curl -u $username:$password -O https://na.artifactory.swg-devops.com:443/artifactory/res-dlt-interop-maven-local/com/cordaSimpleApplication/workflows-kotlin/$simpleAppVersion/workflows-kotlin-$simpleAppVersion.jar)
  else
    echo Please copy the artifactory.properties.template file as artifactory.properties and replace placeholders with Artifactory credentials.
  fi
fi
