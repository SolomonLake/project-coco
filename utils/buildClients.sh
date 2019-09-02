#!/usr/bin/env bash



### Build BackEnd ###

# Remove existing production folder
rm -rf ./dist/client/


### Bundle FrontEnd ###

# Create the directory for React
mkdir -p ./dist/client/webApps

# Navigate to the react directory
cd ./src/client/webApps/coco

# Build React code
npm run build

# Rename the folder
mv build coco

# Move the contains to the build/ dir
mv coco ../../../../dist/client/webApps