terraform {
  backend "s3" {
    bucket = "terrafor-test"  //e.g. terraform-state-bucket
    key    = "test/terraform.tfstate"
    region     = "ap-northeast-1"
  }
}
provider "aws" {
  region = "ap-northeast-1"
}
