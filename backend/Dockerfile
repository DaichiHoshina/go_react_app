FROM golang:1.16.3-alpine as build-step

ENV GOROOT=/usr/local/go
ENV GOPATH=/go
ENV GOBIN=$GOPATH/bin
ENV PATH $PATH:$GOROOT:$GOPATH:$GOBIN
ENV GO111MODULE=on

RUN apk update && apk add git
RUN apk add --no-cache alpine-sdk git
WORKDIR /go/src/github.com/DaichiHoshina/go_react_app/backend

COPY backend/go.mod .
COPY backend/go.sum .
COPY backend/main.go .
COPY ./backend .
RUN go mod download

ARG CGO_ENABLED=0
ARG GOOS=linux
ARG GOARCH=amd64
RUN go build \
    -o /go/bin/main \
    -ldflags '-s -w'

EXPOSE 3001
FROM scratch as runner

# app
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=build-step /go/src/github.com/DaichiHoshina/go_react_app/backend/ .
CMD ["./app"]
