package router

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/selegee/app2/controller"
)

func Init() *echo.Echo {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	e.GET("/api/product/:id", controller.GetProduct)
	e.POST("/api/product", controller.CreateProduct)
	e.PUT("/api/product/:id", controller.UpdateProduct)
	e.DELETE("/api/product/:id", controller.DeleteProduct)

	return e
}
