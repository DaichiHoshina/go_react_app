FROM golang:1.16.3-alpine
RUN apk update && apk add git
RUN apk add --no-cache alpine-sdk git
RUN GO111MODULE=on
# WORKDIR /go/src/api
# ADD . /go/src/api

# COPY go.mod go.sum ./
# RUN go mod download
RUN mkdir /go/src/api
WORKDIR /go/src/github.com/DaichiHoshina/go_react_app/backend
# COPY go.mod go.sum ./
COPY backend/go.mod .
COPY backend/go.sum .
COPY backend/main.go .
COPY ./backend .

RUN go mod download
EXPOSE 3001
ADD . /go/src/github.com/DaichiHoshina/go_react_app/backend
RUN go run main.go

# Goアプリケーションのビルド
# ADD . /go/src/github.com/DaichiHoshina/go_react_app/backend
# RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=1 go build main.go
