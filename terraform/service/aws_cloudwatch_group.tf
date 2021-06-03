resource "aws_cloudwatch_log_group" "sample-service" {
  name = "sample-service"
}

resource "aws_cloudwatch_log_group" "backend-service" {
  name = "backend-service"
}
