FROM node:18-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build


FROM nginx:alpine
COPY ./conf /etc/nginx/conf.d

# VOLUME [ "/data" ]

# Copy static files
COPY --from=build ./app/build /usr/share/nginx/news-app
# COPY ./react/build /usr/share/nginx/news-app

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
