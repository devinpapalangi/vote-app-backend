FROM node:20 as build

USER root



WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main"]