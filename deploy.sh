#!/bin/bash

if docker ps | grep -q "handyman"; then
  docker-compose -f handyman-docker-compose.yml -f mongo-docker-compose.yml down
  docker-compose -f handyman-docker-compose.yml -f mongo-docker-compose.yml up -d
else
    docker-compose -f handyman-docker-compose.yml -f mongo-docker-compose.yml up -d
fi


