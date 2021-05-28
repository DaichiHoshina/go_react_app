package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/DaichiHoshina/go_react_app/infrastructure"
	"github.com/joho/godotenv"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/sirupsen/logrus"
)

func init() {
	logrus.SetLevel(logrus.DebugLevel)
	logrus.SetFormatter(&logrus.JSONFormatter{})

	err := godotenv.Load(".env")
	if err != nil {
		logrus.Fatalf("Error loading env: %v", err)
	}
}

func main() {
	e := echo.New()

	var (
		file  *os.File
		err   error
		awsS3 *infrastructure.AwsS3
		url   string
	)

	file, err = os.Open("./IMG_7931.PNG")

	if err != nil {
		fmt.Printf(err.Error())
		return
	}
	defer file.Close()

	awsS3 = infrastructure.NewAwsS3()

	// multipart.File と os.File は同じように扱える
	url, err = awsS3.UploadTest(file, "test", "png")

	if err != nil {
		fmt.Print(err.Error())
		return
	}
	fmt.Print(url)

	// CORS設定
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", "http://localhost:3002"},
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
