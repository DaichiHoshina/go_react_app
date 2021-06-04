FROM golang:latest as build-step

ENV GOROOT=/usr/local/go
ENV GOPATH=/go
ENV GOBIN=$GOPATH/bin
ENV PATH $PATH:$GOROOT:$GOPATH:$GOBIN
ENV GO111MODULE=on
ENV ENV=production

RUN apt-get update && \
    apt-get install -y wget \
    curl \
    unzip

WORKDIR /go/src/github.com/DaichiHoshina/go_react_app/backend

COPY backend/go.mod .
COPY backend/go.sum .
COPY ./backend .
RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

# app
FROM alpine:latest
WORKDIR /root/
COPY --from=build-step /go/src/github.com/DaichiHoshina/go_react_app/backend/ .
RUN apk add --update --no-cache vim git make musl-dev go curl
EXPOSE 3001
# CMD ["./app"]
