#!/bin/bash
BACKUP_DIR="/data/db/backup"

if docker ps | grep -q "handyman"; then
  docker-compose -f handyman-docker-compose.yml -f mongo-docker-compose.yml down
  docker-compose -f handyman-docker-compose.yml -f mongo-docker-compose.yml up -d
else
    docker-compose -f handyman-docker-compose.yml -f mongo-docker-compose.yml up -d
fi

docker exec handyman-mongo-1 mongodump --uri="mongodb+srv://Javed:QfgtEOcLSYGtQgLT@cluster0.c7tvp.mongodb.net/developement" --out $BACKUP_DIR
docker exec handyman-mongo-1 mongorestore --username root_user --password example --drop $BACKUP_DIR



