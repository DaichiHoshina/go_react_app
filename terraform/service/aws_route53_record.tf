resource "aws_route53_record" "main" {
  zone_id = data.aws_route53_zone.domain.zone_id
  name    = "repgram.com"
  type    = "A"

  alias {
    name                   = aws_lb.lb.dns_name
    zone_id                = aws_lb.lb.zone_id
    evaluate_target_health = true
  }
}

data "aws_route53_zone" "domain" {
  name         = "repgram.com"
  private_zone = false
}

resource "aws_acm_certificate" "cert" {
  domain_name               = "repgram.com"
  subject_alternative_names = ["*.repgram.com"]
  validation_method         = "DNS"
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.domain.zone_id
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

# -------------backend------------------

resource "aws_route53_record" "backend" {
  zone_id = data.aws_route53_zone.backend.zone_id
  name    = "repgram-api.net"
  type    = "A"

  alias {
    name                   = aws_lb.backend-lb.dns_name
    zone_id                = aws_lb.backend-lb.zone_id
    evaluate_target_health = true
  }
}

data "aws_route53_zone" "backend" {
  name         = "repgram-api.net"
  private_zone = false
}

resource "aws_acm_certificate" "backend_cert" {
  domain_name               = "repgram-api.net"
  subject_alternative_names = ["*.repgram-api.net"]
  validation_method         = "DNS"
}

resource "aws_route53_record" "backend_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.backend_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.backend.zone_id
}

resource "aws_acm_certificate_validation" "backend_cert" {
  certificate_arn         = aws_acm_certificate.backend_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.backend_cert_validation : record.fqdn]
}
