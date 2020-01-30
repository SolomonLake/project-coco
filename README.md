## Running Locally

`./run-app.sh` to run the app locally. The client web app runs at `localhost:3006`.

## Deploying

`./deploy-app.sh` to deploy the app. This will deploy the current state of your local branch.

## Summary

All server code lives within /functions. Each endpoint is it's own cloud function. All client code lives within /src. All auth tokens are handled serverside, and cached in a redis cache. They are accessed through a cookie based auth that jwt encodes a user's zoom user id.
