#!/bin/bash
# Update the package list
sudo apt-get update -y

# Install Docker
sudo apt-get install -y docker.io

# Enable and start the Docker service
sudo systemctl enable docker
sudo systemctl start docker

# Add the default user (assumed to be 'ubuntu') to the docker group
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -SL https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-linux-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
