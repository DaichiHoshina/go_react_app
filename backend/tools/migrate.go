package main

import (
	"github.com/DaichiHoshina/go_react_app/infrastructure"
	"github.com/DaichiHoshina/go_react_app/model"
	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		logrus.Fatalf("Error loading env: %v", err)
	}

	db := infrastructure.Connect()

	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.Presentation{})
	db.AutoMigrate(&model.Like{})
}
