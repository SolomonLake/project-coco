#!/usr/bin/env bash

set -o errexit 
set -o pipefail
set -o nounset

cloudFunctionFolders=( "zoomApiProxy" "zoomGetTokenData" "zoomNotifications" "loginUser" )

npm install
npm run build

if [ $# -eq 1 ]
then
  echo Deploying $1
  gcloud functions deploy $1 --runtime nodejs10 --trigger-http --env-vars-file .prod-env.yaml
else
  for i in "${cloudFunctionFolders[@]}"
  do
    echo Deploying $i
    gcloud functions deploy $i --runtime nodejs10 --trigger-http --env-vars-file .prod-env.yaml
  done
fi