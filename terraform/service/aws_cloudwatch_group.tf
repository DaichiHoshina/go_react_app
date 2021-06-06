resource "aws_cloudwatch_log_group" "front-service" {
  name = "front-service"
}

resource "aws_cloudwatch_log_group" "backend-service" {
  name = "backend-service"
}
