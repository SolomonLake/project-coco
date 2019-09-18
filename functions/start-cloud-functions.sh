#!/usr/bin/env bash

set -o errexit 
set -o pipefail
set -o nounset

npm install
npm run build

set -o allexport; source ./dev.env; set +o allexport

if [ -n "${1-}" ]
  then
    export CLOUD_FUNCTION_ENDPOINT="https://${1}.ngrok.io"
    ../node_modules/.bin/npx ttab eval "ngrok http 8080 -subdomain=${1} -host-header=localhost:8080"
fi


./node_modules/.bin/npx @google-cloud/functions-framework --target=index