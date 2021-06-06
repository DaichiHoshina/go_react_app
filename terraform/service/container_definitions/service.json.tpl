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
        "awslogs-group": "front-service",
        "awslogs-region": "ap-northeast-1",
        "awslogs-stream-prefix": "service"
      }
    },
    "environment": [],
    "secrets": []
  }
]
