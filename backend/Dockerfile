FROM golang:1.16.3-alpine
RUN mkdir /go/src/backend
WORKDIR /go/src/backend
ADD . /go/src/backend
RUN apk add --no-cache alpine-sdk git
RUN GO111MODULE=on

RUN apt-get update && \
  apt-get install -y wget \
  curl \
  unzip
  # libprotobuf-dev \
  # libprotoc-dev \
  # protobuf-compiler \
  # make

WORKDIR /go/src/github.com/DaichiHoshina/go_react_app/backend

COPY . .
RUN go mod download

RUN go get -u github.com/golang/protobuf/protoc-gen-go \
  && go get -u golang.org/x/lint/golint

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

# app
FROM alpine:latest

RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=build /go/src/github.com/DaichiHoshina/go_react_app/backend .
EXPOSE 50052
CMD ["./app"]
