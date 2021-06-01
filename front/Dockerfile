FROM node:14.15.3-alpine
WORKDIR /usr/src/app
COPY front/package.json .
COPY front/yarn.lock .
RUN yarn install
RUN yarn build
# COPY frontend .
EXPOSE 3000
