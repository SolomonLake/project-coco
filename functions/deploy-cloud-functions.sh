#!/usr/bin/env bash

set -o errexit 
set -o pipefail
set -o nounset

cloudFunctionFolders=( "zoomApiProxy" "zoomGetTokenData" "zoomNotifications" "loginUser" )

npm install
npm run build

for i in "${cloudFunctionFolders[@]}"
do
	echo Deploying $i
  gcloud functions deploy $i --runtime nodejs10 --trigger-http --env-vars-file .prod-env.yaml
  # cd $i
  # npm run deploy
  # cd ..
done