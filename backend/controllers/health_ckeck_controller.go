package controllers

import (
	"net/http"

	"github.com/labstack/echo"
	"gorm.io/gorm"
)

func HealthCheck(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		jsonMap := map[string]string{
			"status": "ok",
		}
		return c.JSON(http.StatusNotFound, jsonMap)
	}
}
