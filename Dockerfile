FROM node:20 as build

USER root

RUN apt-get update && apt-get install -y docker.io

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main"]