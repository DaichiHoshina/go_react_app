FROM golang:1.16.3-alpine
RUN apk update && apk add git
RUN apk add --no-cache alpine-sdk git
RUN GO111MODULE=on

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

COPY --from=builder /go/bin/main /app/main

ENTRYPOINT ["/app/main"]

# Goアプリケーションのビルド
# ADD . /go/src/github.com/DaichiHoshina/go_react_app/backend
# RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=1 go build main.go
