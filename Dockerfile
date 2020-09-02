FROM node:12.13-alpine AS build
WORKDIR /app
COPY package*.json /app/
RUN npm install --loglevel verbose
COPY src /app/src/
COPY *.json /app/
COPY *.js /app/
RUN npm run build:prod

FROM nginx:alpine
VOLUME /var/cache/nginx
EXPOSE 80
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
