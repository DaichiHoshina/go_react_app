package controllers

import (
	"github.com/DaichiHoshina/go_react_app/model"
	"github.com/labstack/echo"
	"github.com/valyala/fasthttp"
	"gorm.io/gorm"
)

func GetHospitals(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var hospitals []model.Hospital
		db.Find(&hospitals)
		return c.JSON(fasthttp.StatusOK, hospitals)
	}
}

func CreateHospital(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		hospitalName := c.QueryParam("name")
		hospital := model.Hospital{Name: hospitalName}
		db.Create(&hospital)
		return c.JSON(fasthttp.StatusOK, hospital)
	}
}
