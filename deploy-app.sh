#!/usr/bin/env bash

set -o errexit 
set -o pipefail
set -o nounset

npm install

npm run deploy

cd ./functions
./deploy-cloud-functions.sh
