#!/usr/bin/env bash

set -o errexit 
set -o pipefail
set -o nounset

cloudFunctionFolders=( "./zoomApiProxy" "./zoomGetTokenData" "./zoomNotifications" "./loginUser" )

for i in "${cloudFunctionFolders[@]}"
do
	echo Deploying $i
  cd $i
  npm run deploy
  cd ..
done