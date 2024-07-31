FROM ubuntu:latest

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm 
# FROM node

COPY . /home/products-app/

WORKDIR /home/products-app/

RUN node -v

RUN npm install

# RUN npm install -g pm2

CMD ["npm", "start"]