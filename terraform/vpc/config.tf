terraform {
  backend "s3" {
    bucket = "terrafor-test"  //e.g. terraform-state-bucket
    key    = "test/terraform.tfstate"
    region     = "ap-northeast-1"
    # profile = "sample" // s3にアクセスできるアカウントでawsのプロファイルを作成する！
  }
}
provider "aws" {
  region = "ap-northeast-1"
}
