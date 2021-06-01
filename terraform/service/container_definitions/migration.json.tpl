[
  {
    "name": "repgram",
    "image": "326324184951.dkr.ecr.ap-northeast-1.amazonaws.com/frontend:latest",
    "cpu": 200,
    "memory": null,
    "memoryReservation": 600,
    "essential": true,
    "command": ["bundle", "exec", "rake", "db:create", "db:migrate"],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "sample-service",
        "awslogs-region": "ap-northeast-1",
        "awslogs-stream-prefix": "migration"
      }
    },
    "environment": [],
    "secrets": [
      {
        "name": "DB_HOST",
        "valueFrom": "DB_HOST"
      },
      {
        "name": "DB_USER",
        "valueFrom": "DB_USER"
      },
      {
        "name": "DB_PASSWORD",
        "valueFrom": "DB_PASSWORD"
      },
      {
        "name": "RACK_ENV",
        "valueFrom": "APP_ENV"
      }
    ]
  }
]
