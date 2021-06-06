resource "aws_ecs_cluster" "repgram-front" {
  name = "repgram-front"
}

resource "aws_ecs_cluster" "repgram-backend" {
  name = "repgram-backend"
}
