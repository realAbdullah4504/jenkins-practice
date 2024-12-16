#!/bin/bash

# Update and install required packages
sudo apt update -y
sudo apt upgrade -y
sudo apt install nginx -y

# Allow nginx through firewall (if using UFW)
# sudo ufw allow 'Nginx Full'

# Create directories for your web application if not already existing
sudo mkdir -p /var/www/news-app

# Set ownership of /var/www to 'abdullah' and 'abdullah' group
sudo chown -R abdullah:abdullah /var/www/

# Set permissions for the /var/www directory (read, write, and execute for the owner, and read/execute for others)
sudo chmod -R 755 /var/www/

# Set the proper nginx configuration in /etc/nginx/sites-available/
# Assuming the configuration file should be created for the '/news-app' route

cat <<EOF | sudo tee /etc/nginx/sites-available/news-app
server {
    listen 80;
    server_name _;

    root /var/www/news-app;
    index index.html;

    location /news-app/ {
        root  /var/www;
        index  index.html index.htm;
        #try_files $uri $uri/ /news-app/index.html;
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
