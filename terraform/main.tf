variable "access_key" {}
variable "secret_key" {}
# variable "token" {}
# variable "db_user" {}
# variable "db_pass" {}
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
  # token = "${var.token}"
  region     = "${var.region}"
}

resource "aws_instance" "example" {
  ami           = "${lookup(var.amis, var.region)}"
  instance_type = "t2.nano"
  key_name      = "${aws_key_pair.auth.id}"
  vpc_security_group_ids = ["${aws_security_group.default.id}"]
}

resource "aws_key_pair" "auth" {
  key_name   = "${var.key_name}"
  public_key = "${file(var.public_key_path)}"
}

resource "aws_security_group" "default" {
  name        = "terraform_security_group"
  description = "Used in the terraform"

  # SSH access from anywhere
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# variable "amis" {
#   type = "map"
#   default = {
#     us-east-1 = "ami-13be557e"
#     us-west-2 = "ami-21f78e11"
#     ap-northeast-1 = "ami-1bfdb67c"
#   }
# }

variable "key_name" {
  description = "Desired name of AWS key pair"
}

variable "public_key_path" {
  description = <<DESCRIPTION
Path to the SSH public key to be used for authentication.
Ensure this keypair is added to your local SSH agent so provisioners can
connect.

Example: ~/.ssh/terraform.pub
DESCRIPTION
}
# module "pro" {
#   region                            = "${var.region}"
#   db_user                           = "${var.db_user}"
#   db_pass                           = "${var.db_pass}"
#   source = "./modules"
# }
