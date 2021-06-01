data "terraform_remote_state" "aws_iam" {
  backend = "s3"

  config = {
    bucket = "terrafor-test"
    key    = "sample/iam/terraform.tfstate"
    region = "ap-northeast-1"
  }
}

data "terraform_remote_state" "vpc" {
  backend = "s3"

  config = {
    bucket = "terrafor-test"
    key    = "test/terraform.tfstate"
    region = "ap-northeast-1"
  }
}
