FROM ubuntu:latest

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm

WORKDIR /app

COPY package.json .


RUN npm install

COPY . .

CMD ["npm", "start"]