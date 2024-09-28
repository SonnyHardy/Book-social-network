FROM node:22-bullseye-slim AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install
#RUN npm install -g @angular/cli

COPY . .

RUN npm run build --configuration=production


FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
#COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist/book-network-ui/browser /usr/share/nginx/html

EXPOSE 80