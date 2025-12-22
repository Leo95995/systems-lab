#!/bin/bash

set -e 

DOCKER_COMPOSE_PATH=$1

if [[  -z "$DOCKER_COMPOSE_PATH" || ! -f "$DOCKER_COMPOSE_PATH" ]];then
echo "Docker path not specified or not valid "
exit 1

fi

# check docker compose 
# command -v check if the command exists
#  &> /dev/null -> delete all the output generate from command -v
if ! command -v docker compose  &> /dev/null;then
    echo "Docker compose not installed "
    exit 1
fi
# get the docker compose full path folder
WORKING_DIR=$(dirname "$DOCKER_COMPOSE_PATH")
# enter in the working directory
cd "$WORKING_DIR"
# remove docker containers
docker compose down
# build and start everything
docker compose up -d --build