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
  gcloud functions deploy $1 --runtime nodejs10 --trigger-http --region us-central1 --vpc-connector projects/project-coco-251813/locations/us-central1/connectors/project-coco-connector --env-vars-file .prod-env.yaml
else
  for i in "${cloudFunctionFolders[@]}"
  do
    echo Deploying $i
    gcloud functions deploy $i --runtime nodejs10 --trigger-http --region us-central1 --vpc-connector projects/project-coco-251813/locations/us-central1/connectors/project-coco-connector --env-vars-file .prod-env.yaml &
  done  
  wait
fi