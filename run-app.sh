#!/usr/bin/env bash

set -o errexit
set -o nounset

killall node || true

./node_modules/.bin/npx ttab eval "cd ./functions; ./run-cloud-functions.sh"

./node_modules/.bin/npx ttab eval "npm install; npm start"