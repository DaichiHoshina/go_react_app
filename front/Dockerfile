FROM node:14.15.3-alpine
WORKDIR /usr/src/app
COPY front/package.json .
COPY front/yarn.lock .
COPY ./front .
RUN yarn install
RUN yarn build
EXPOSE 3000
