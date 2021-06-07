FROM node:14.15.3-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app

COPY front/package.json .
COPY front/yarn.lock .
COPY ./front .

RUN yarn install
RUN yarn add --dev @types/node
RUN yarn build

COPY . .

EXPOSE 3000

ENTRYPOINT [ "yarn", "start" ]
