FROM golang:1.16.3-alpine
RUN apk update && apk add git
RUN apk add --no-cache alpine-sdk git
RUN mkdir /go/src/api
RUN GO111MODULE=on
# WORKDIR /go/src/api
# ADD . /go/src/api

# COPY go.mod go.sum ./
# RUN go mod download
WORKDIR /go/src/github.com/DaichiHoshina/go_react_app/backend

COPY . .
RUN go mod download
RUN go run ./tools/migrate.go
