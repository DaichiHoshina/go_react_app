package controllers

import (
	"net/http"

	"github.com/DaichiHoshina/go_react_app/model"
	"github.com/labstack/echo"
	"github.com/valyala/fasthttp"
	"gorm.io/gorm"
)

// GetUsers ユーザを取得
func GetUsers(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var users []model.User
		db.Find(&users)
		return c.JSON(fasthttp.StatusOK, users)
	}
}

func GetUser(c echo.Context) error {
  user := User{}
  if err := c.Bind(&user); err != nil {
    return err
  }
  database.DB.Take(&user)
  return c.JSON(http.StatusOK, user)
}

// CreateUser ユーザ追加
func CreateUser(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		userName := c.QueryParam("name")
		user := model.User{Name: userName}
		db.Create(&user)
		return c.JSON(fasthttp.StatusOK, user)
	}
}
