FROM golang:latest as build-step

ENV GOROOT=/usr/local/go
ENV GOPATH=/go
ENV GOBIN=$GOPATH/bin
ENV PATH $PATH:$GOROOT:$GOPATH:$GOBIN
ENV GO111MODULE=on

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
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=build-step /go/src/github.com/DaichiHoshina/go_react_app/backend/ .
EXPOSE 3001
CMD ["./backend"]
