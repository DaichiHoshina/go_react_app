terraform {
  backend "s3" {
    bucket = "nasum-sample-terraform"
    key    = "sample/service/terraform.tfstate"
    region = "ap-northeast-1"
  }
}

provider "aws" {
  region = "ap-northeast-1"
}