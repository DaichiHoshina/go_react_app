# ベースとなるDockerイメージ指定
FROM golang:latest
# コンテナ内に作業ディレクトリを作成
RUN mkdir /go/src/backend
# コンテナログイン時のディレクトリ指定
WORKDIR /go/src/backend
# ホストのファイルをコンテナの作業ディレクトリに移行
ADD . /go/src/backend
