package main

import (
	"net/http"
	"os"

	"github.com/DaichiHoshina/go_react_app/backend/infrastructure"
	"github.com/joho/godotenv"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/sirupsen/logrus"
)

func init() {
	logrus.SetLevel(logrus.DebugLevel)
	logrus.SetFormatter(&logrus.JSONFormatter{})

	if os.Getenv("ENV") == "" {
		err := godotenv.Load(".env")
		if err != nil {
			logrus.Fatalf("Error loading env: %v", err)
		}
	}
}

func main() {
	e := echo.New()

	// CORS設定
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", "http://localhost:3002", "https://repgram.com"},
		AllowHeaders: []string{
			echo.HeaderAccessControlAllowHeaders,
			echo.HeaderContentType,
			echo.HeaderContentLength,
			echo.HeaderAcceptEncoding,
			echo.HeaderXCSRFToken,
			echo.HeaderAuthorization,
		},
		AllowMethods: []string{
			http.MethodGet,
			http.MethodPut,
			http.MethodPatch,
			http.MethodPost,
			http.MethodDelete,
		},
		AllowCredentials: true,
	}))

	// Middleware
	e.Use(middleware.Logger())
	// e.Use(middleware.CORS())

	// DB Connect
	db := infrastructure.Connect()

	// Routes
	infrastructure.Init(e, db)

	// Start server
	e.Logger.Fatal(e.Start(":" + os.Getenv("PORT")))
}
