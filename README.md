# Repgram

爬虫類好きが、ペットの爬虫類の写真を投稿して交流するためのサービス。

### 使用技術

- フロントエンド

  - React(TypeScript、Next.js)

- バックエンド

  - Golang(Echo)

- インフラ
  - Docker,docker-compose
  - AWS(IAM,VPC,ECS,ECR,RDS,Route53,ELB,S3,CloudWatch)
  - terraform
  - CircleCI

### 構成図

![AWS構成図](https://user-images.githubusercontent.com/50498102/123069556-d9686580-d44d-11eb-86fe-c6f81bc118db.png)

### 機能一覧

- ユーザー登録、編集
- 写真投稿、編集、削除
- いいね登録、削除

### アピールポイント

1. テストコードを書いている
2. ESlint を使用して、規約を守ってコードを書いている
3. フロントでマテリアルデザインを採用している
4. CircleCI で Dockerfile のビルドを行い、本番環境を自動で更新している
5. フロントで Material UI を採用している
6. terraform でインフラをコード化している

### 課題点

1. マテリアルデザインを採用したが、分け方が難しく、atoms と organisms の２つに偏ってしまった
2. バックエンドのテストを細かく行うために、クリーンアーキテクチャーを採用する必要があった
