[
  {
    "name": "repgram",
    "image": "326324184951.dkr.ecr.ap-northeast-1.amazonaws.com/frontend:latest",
    "cpu": 333,
    "memoryReservation": 600,
    "essential": true,
    "portMappings": [
      {
        "hostPort": 0,
        "protocol": "tcp",
        "containerPort": 3000
      }
    ],
    "command": ["yarn ", "start"],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "sample-service",
        "awslogs-region": "ap-northeast-1",
        "awslogs-stream-prefix": "service"
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
