resource "aws_lb_listener" "http" {
  load_balancer_arn = "${aws_lb.lb.arn}"
  port              = "80"
  protocol          = "HTTP"

  default_action {
    target_group_arn = "${aws_lb_target_group.http.arn}"
    type             = "forward"
  }
}

resource "aws_lb_listener" "https" {
    load_balancer_arn = aws_lb.lb.arn
    port = "443"
    protocol = "HTTPS"
    default_action {
        target_group_arn = aws_lb_target_group.http.arn
        type = "forward"
    }
    certificate_arn = aws_acm_certificate.cert.arn
}

resource "aws_lb_listener" "backend-http" {
  load_balancer_arn = "${aws_lb.backend-lb.arn}"
  port              = "80"
  protocol          = "HTTP"

  default_action {
    target_group_arn = "${aws_lb_target_group.backend-http.arn}"
    type             = "forward"
  }
}

resource "aws_lb_listener" "backend-https" {
    load_balancer_arn = aws_lb.backend-lb.arn
    port = "443"
    protocol = "HTTPS"
    default_action {
        target_group_arn = aws_lb_target_group.backend-http.arn
        type = "forward"
    }
    certificate_arn = aws_acm_certificate.cert.arn
}
