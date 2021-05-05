// package main

// import (
// 	"net/http"

// 	"github.com/labstack/echo"
// )

// func main() {
// 	e := echo.New()
// 	e.GET("/users/:name", getUserName)
// 	e.Logger.Fatal(e.Start(":3002"))

// }

// func getUserName(c echo.Context) error {
// 	name := c.Param("name")
// 	return c.String(http.StatusOK, name)
// }

package main

import (
	"os"

	"github.com/DaichiHoshina/go_react_app/tree/develop/backend/infrastructure"
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

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.CORS())

	// DB Connect
	db := infrastructure.Connect()

	// Routes
	infrastructure.Init(e, db)

	// Start server
	e.Logger.Fatal(e.Start(":" + os.Getenv("PORT")))
}
