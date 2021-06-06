resource "aws_lb" "lb" {
  name               = "front-lb"
  internal           = false
  load_balancer_type = "application"

  security_groups = [
    "${aws_security_group.alb.id}",
  ]

  subnets = [
    data.terraform_remote_state.vpc.outputs.public_subnet_1_id,
    data.terraform_remote_state.vpc.outputs.public_subnet_2_id,
  ]
}

resource "aws_lb" "backend-lb" {
  name               = "backend-lb"
  internal           = false
  load_balancer_type = "application"

  security_groups = [
    "${aws_security_group.alb.id}",
  ]

  subnets = [
    data.terraform_remote_state.vpc.outputs.public_subnet_1_id,
    data.terraform_remote_state.vpc.outputs.public_subnet_2_id,
  ]
}
