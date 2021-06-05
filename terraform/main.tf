variable "access_key" {}
variable "secret_key" {}
variable "region" { default = "ap-northeast-1"}

terraform {
  backend "s3" {
    bucket = "terrafor-test"  //e.g. terraform-state-bucket
    key    = "test/terraform.tfstate"
    region     = "ap-northeast-1"
    # profile = "sample" // s3にアクセスできるアカウントでawsのプロファイルを作成する！
  }
}

provider "aws" {
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
  region     = "${var.region}"
}
