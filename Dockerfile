FROM httpd:2.4
WORKDIR react-app
COPY . .
RUN npm install
RUN npm run build
# Copiar la aplicación React
COPY /react-app/dist/ /usr/local/apache2/htdocs/
