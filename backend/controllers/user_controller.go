package controllers

import (
	"github.com/DaichiHoshina/go_react_app/model"
	"github.com/labstack/echo"
	"github.com/valyala/fasthttp"
	"gorm.io/gorm"
)

func GetUsers(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var users []model.User
		db.Find(&users)
		return c.JSON(fasthttp.StatusOK, users)
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
		userName := c.QueryParam("name")
		user := model.User{Name: userName}
		db.Create(&user)
		return c.JSON(fasthttp.StatusOK, user)
	}
}

func UpdateUser(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {

		if id := c.Param("id"); id != "" {
			var user []model.User
			db.First(&user, id)
			// newUser := new([]model.User)
			// if err := c.Bind(newUser); err != nil {
			// 	return err
			// }
			db.Model(&user).Update("name", "hello")
			return c.JSON(fasthttp.StatusOK, user)
		} else {
			return c.JSON(fasthttp.StatusNotFound, nil)
		}
	}
}

// func DeletePost(c echo.Context) error {
// 	db := OpenSQLiteConnection()
// 	defer db.Close()

// 	if id := c.Param("id"); id != "" {
// 		var post Post
// 		db.First(&post, id)
// 		db.Delete(post)
// 		return c.JSON(http.StatusOK, post)
// 	} else {
// 		return c.JSON(http.StatusNotFound, nil)
// 	}
// }
