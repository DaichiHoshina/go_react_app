package main

import (
	"os"

	"github.com/DaichiHoshina/go_react_app/backend/infrastructure"
	"github.com/DaichiHoshina/go_react_app/backend/model"
	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
)

// マイグレーション
func main() {
	if "" == os.Getenv("ENV") {
		err := godotenv.Load(".env")
		if err != nil {
			logrus.Fatalf("Error loading env: %v", err)
		}
	}

	db := infrastructure.Connect()

	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.Presentation{})
	db.AutoMigrate(&model.Like{})
}
