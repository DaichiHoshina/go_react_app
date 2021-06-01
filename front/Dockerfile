FROM node:14.15.3-alpine
WORKDIR /usr/src/app
COPY front/package.json .
COPY front/yarn.lock .
RUN yarn install
COPY ./frontend .
EXPOSE 3000
ENTRYPOINT [ "yarn", "start" ]
