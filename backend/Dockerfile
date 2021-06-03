FROM golang:1.16.3-alpine
RUN mkdir /go/src/app
WORKDIR /go/src/app

COPY ./backend/go.mod .
COPY ./backend/go.sum .
RUN go mod download

COPY .backend/main.go  .

RUN apk add --no-cache alpine-sdk git
RUN GO111MODULE=on
RUN go run ./tools/migrate.go
