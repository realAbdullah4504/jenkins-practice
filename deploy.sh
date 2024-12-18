#!/bin/bash

# Update and install required packages
sudo apt update -y
sudo apt upgrade -y
sudo apt install nginx -y
sudo apt install -y nodejs
sudo npm install -g pm2

#mongoDB installation

curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
--dearmor

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

sudo apt-get install -y mongodb-org

# Allow nginx through firewall (if using UFW)
# sudo ufw allow 'Nginx Full'

# Create directories for your web application if not already existing
sudo mkdir -p /var/www/news-app

# Set ownership of /var/www to 'abdullah' and 'abdullah' group
sudo chown -R ubuntu:ubuntu /var/www/

# Set permissions for the /var/www directory (read, write, and execute for the owner, and read/execute for others)
sudo chmod -R 755 /var/www/

# Set the proper nginx configuration in /etc/nginx/sites-available/
# Assuming the configuration file should be created for the '/news-app' route

cat <<EOF | sudo tee /etc/nginx/sites-available/news-app
server {
    listen 3000;
    server_name _;
    
    root /var/www/news-app;

    # Main location block
    location / {
        try_files $uri $uri/ /index.html;
    }
    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Handle static files separately
    location /static/ {
        try_files $uri =404;
    }

    # Special handling for index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires 0;
    }
}
EOF

# Create a symbolic link in /etc/nginx/sites-enabled/ to enable the site
sudo ln -s /etc/nginx/sites-available/news-app /etc/nginx/sites-enabled/

# Test Nginx configuration to make sure it's correct
sudo nginx -t

# Reload Nginx to apply the changes
sudo systemctl reload nginx

# Ensure nginx is running
sudo systemctl status nginx
