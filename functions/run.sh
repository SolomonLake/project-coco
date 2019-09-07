#!/usr/bin/env bash

set -o errexit 
set -o pipefail
set -o nounset

npm run build

export ZOOM_CLIENT_SECRET=KaF3h3z88lylbF6N9v8sm8iGSP4xm2Gy
export ZOOM_CLIENT_ID=HqnmSZ3VTuWHG7X4DuEh9A
export ZOOM_APP_VERIFICATION=CLzrvWlKRQOUQlHLjvrKbQ
export APP_ENDPOINT=http://localhost:3006
export APP_DOMAIN=http://localhost:3006
export CLOUD_FUNCTION_ENDPOINT__ZOOM_GET_TOKEN_DATA=http://localhost:8080
export CLOUD_FUNCTION_ENDPOINT=http://localhost:8080

npx @google-cloud/functions-framework --target=index