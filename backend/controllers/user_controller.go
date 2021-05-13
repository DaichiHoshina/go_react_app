package controllers

import (
	"net/http"

	"github.com/DaichiHoshina/go_react_app/model"
	"github.com/labstack/echo"
	"github.com/valyala/fasthttp"
	"gorm.io/gorm"
)

func GetUsers(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var users []model.User
		db.Find(&users)
		// arrayUser := model.Users{}
		return c.JSON(fasthttp.StatusOK, users)
		// return c.JSON(fasthttp.StatusOK, users)
	}
}

func GetUser(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		if id := c.Param("id"); id != "" {
			var users []model.User
			db.First(&users, id)
			return c.JSON(fasthttp.StatusOK, users)
		} else {
			return c.JSON(fasthttp.StatusNotFound, nil)
		}
	}
}

func CreateUser(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		post := new(model.User)
		// userName := c.FormValue("name")
		if err := c.Bind(post); err != nil {
			return err
	}
	// user := h.userModel.Create(post.Name, post.Id);
		user := model.User{Name: post.Name}
		db.Create(&user)
		return c.JSON(fasthttp.StatusOK, user)
	}
}

func UpdateUser(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		if id := c.Param("id"); id != "" {
			var user []model.User
			db.First(&user, id)
			newUser := c.QueryParam("name")

			db.Model(&user).Update("name", newUser)
			return c.JSON(fasthttp.StatusOK, user)
		} else {
			return c.JSON(fasthttp.StatusNotFound, nil)
		}
	}
}

func DeleteUser(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		if id := c.Param("id"); id != "" {
			var user []model.User
			db.First(&user, id)
			db.Delete(&user)
			return c.JSON(http.StatusOK, user)
		} else {
			return c.JSON(http.StatusNotFound, nil)
		}
	}
}
