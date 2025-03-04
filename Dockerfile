FROM node:18 AS build-stage
WORKDIR /react-app
COPY . .
RUN npm install
RUN npm run build

# Fase de producción con Apache
FROM httpd:2.4
WORKDIR /usr/local/apache2/htdocs/
COPY --from=build-stage /react-app/dist/ .