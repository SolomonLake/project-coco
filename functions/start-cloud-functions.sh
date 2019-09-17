#!/usr/bin/env bash

set -o errexit 
set -o pipefail
set -o nounset

npm install
npm run build

set -o allexport; source ./dev.env; set +o allexport

./node_modules/.bin/npx @google-cloud/functions-framework --target=index