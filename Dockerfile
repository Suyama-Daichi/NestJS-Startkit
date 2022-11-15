FROM node:16

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --immutable --immutable-cache --check-cache
COPY . .
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start:prod" ]