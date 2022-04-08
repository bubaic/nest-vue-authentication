FROM node:17-alpine
WORKDIR /app

COPY package.json ./
RUN yarn install

COPY . /app

RUN yarn build