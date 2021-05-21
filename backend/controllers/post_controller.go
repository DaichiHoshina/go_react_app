package controllers

import (
	"net/http"

	"github.com/DaichiHoshina/go_react_app/model"
	"github.com/labstack/echo"
	"github.com/valyala/fasthttp"
	"gorm.io/gorm"
)

func GetPosts(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var posts []model.Post
		db.Find(&posts)
		return c.JSON(fasthttp.StatusOK, posts)
	}
}

func GetPost(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		if id := c.Param("id"); id != "" {
			var posts []model.Post
			db.First(&posts, id)
			return c.JSON(fasthttp.StatusOK, posts)
		} else {
			return c.JSON(fasthttp.StatusNotFound, nil)
		}
	}
}

func CreatePost(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		post := new(model.Post)
		if err := c.Bind(post); err != nil {
			return err
		}
		post := model.Post{Discription: post.Discription}
		db.Create(&post)
		return c.JSON(fasthttp.StatusOK, post)
	}
}

func UpdatePost(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		if id := c.Param("id"); id != "" {
			var post []model.Post
			db.First(&post, id)
			post := new(model.Post)

			if err := c.Bind(post); err != nil {
				return err
			}
			// newPost := c.QueryParam("name")

			db.Model(&post).Update("name", post.Name)
			return c.JSON(fasthttp.StatusOK, post)
		} else {
			return c.JSON(fasthttp.StatusNotFound, nil)
		}
	}
}

func DeletePost(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		if id := c.Param("id"); id != "" {
			var post []model.Post
			db.First(&post, id)
			db.Delete(&post)
			return c.JSON(http.StatusOK, post)
		} else {
			return c.JSON(http.StatusNotFound, nil)
		}
	}
}
