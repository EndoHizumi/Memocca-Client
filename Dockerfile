FROM node

RUN npm install -g http-server
COPY . /var/html/www/memocca
WORKDIR /var/html/www/memocca
CMD ["http-server"]
