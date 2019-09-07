#!/usr/bin/env bash

set -o errexit 
set -o pipefail
set -o nounset

killall node

npm install

./node_modules/.bin/npx ttab eval "cd ./functions; ./run-cloud-functions.sh"

./node_modules/.bin/npx ttab eval "npm start"