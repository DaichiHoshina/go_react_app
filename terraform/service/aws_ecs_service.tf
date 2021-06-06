resource "aws_ecs_service" "webapp-service" {
  name            = "webapp-service"
  cluster         = "${aws_ecs_cluster.repgram-front.id}"
  task_definition = "${aws_ecs_task_definition.front-task.arn}"
  desired_count   = 1
  launch_type     = "EC2"

  load_balancer {
    target_group_arn = aws_lb_target_group.http.arn
    container_name   = "repgram"
    container_port   = "3000"
  }
}

resource "aws_ecs_service" "backend-service" {
  name            = "backend-service"
  cluster         = "${aws_ecs_cluster.repgram-backend.id}"
  task_definition = "${aws_ecs_task_definition.backend-task.arn}"
  desired_count   = 1
  launch_type     = "EC2"

  load_balancer {
    target_group_arn = aws_lb_target_group.backend-http.arn
    container_name   = "repgram-backend"
    container_port   = "3001"
  }
}
