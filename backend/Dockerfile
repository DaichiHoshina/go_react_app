FROM golang:1.16.3-alpine
RUN mkdir /go/src/backend
WORKDIR /go/src/backend
ADD . /go/src/backend
RUN apk add --no-cache alpine-sdk git
RUN GO111MODULE=on
