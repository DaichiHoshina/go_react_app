FROM golang:1.16.3-alpine
RUN apk update && apk add git
RUN apk add --no-cache alpine-sdk git
RUN mkdir /go/src/api
WORKDIR /go/src/api
ADD . /go/src/api

COPY go.mod go.sum ./
RUN go mod download

RUN GO111MODULE=on
RUN go run ./tools/migrate.go
