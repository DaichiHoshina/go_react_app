package controllers

import (
	"net/http"

	"github.com/DaichiHoshina/go_react_app/model"
	"github.com/labstack/echo"
	"github.com/valyala/fasthttp"
	"gorm.io/gorm"
)

func CreateLike(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		post := new(model.Like)
		if err := c.Bind(post); err != nil {
			return err
		}
		presentation := model.Like{
			UserID:      post.UserID,
			PresentationID: post.PresentationID,
		}
		if result := db.Create(&presentation); result.Error != nil {
			return c.JSON(http.StatusBadRequest, result.Error)
		}
		return c.JSON(fasthttp.StatusOK, presentation)
	}
}

func DeleteLike(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		if id := c.Param("id"); id != "" {
			var presentation []model.Like
			db.First(&presentation, id)
			db.Delete(&presentation)
			return c.JSON(http.StatusOK, presentation)
		} else {
			return c.JSON(http.StatusBadRequest, nil)
		}
	}
}
