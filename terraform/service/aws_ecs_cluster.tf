resource "aws_ecs_cluster" "sample-ecs-cluster" {
  name = "sample-ecs-cluster"
}

resource "aws_ecs_cluster" "repgram-backend" {
  name = "repgram-backend"
}
