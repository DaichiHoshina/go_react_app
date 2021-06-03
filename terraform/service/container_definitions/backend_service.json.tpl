[
  {
    "name": "repgram-backend",
    "image": "326324184951.dkr.ecr.ap-northeast-1.amazonaws.com/backend:latest",
    "cpu": 333,
    "memoryReservation": 600,
    "essential": true,
    "portMappings": [
      {
        "hostPort": 0,
        "protocol": "tcp",
        "containerPort": 3001
      }
    ],
    "command": ["go", "run", "main.go"],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "backend-service",
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
