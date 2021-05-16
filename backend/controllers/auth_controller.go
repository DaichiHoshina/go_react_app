// authController.go
package controllers

import (
	"github.com/DaichiHoshina/go_react_app/model"
	"github.com/labstack/echo"
	"github.com/valyala/fasthttp"
	"gorm.io/gorm"
)

func Register(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		post := new(model.User)
		if err := c.Bind(post); err != nil {
			return err
	}
		user := model.User{
			Name: post.Name,
			Email: post.Email,
			Password: post.Password,
		}

		db.Create(&user)
		return c.JSON(fasthttp.StatusOK, user)
	}
}
