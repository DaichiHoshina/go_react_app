package controllers

import (
	"fmt"
	"net/http"

	"github.com/DaichiHoshina/go_react_app/backend/model"
	"github.com/labstack/echo"
	"github.com/valyala/fasthttp"
	"gorm.io/gorm"
)

// いいね追加
func CreateLike(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		post := new(model.Like)
		if err := c.Bind(post); err != nil {
			return err
		}

		fmt.Println(post.UserID, post.PresentationID)
		like := model.Like{
			UserID:         post.UserID,
			PresentationID: post.PresentationID,
		}

		if result := db.Create(&like); result.Error != nil {
			return c.JSON(http.StatusBadRequest, result.Error)
		}
		return c.JSON(fasthttp.StatusOK, like)
	}
}

// いいね削除
func DeleteLike(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		post := new(model.Like)
		if err := c.Bind(post); err != nil {
			return err
		}

		fmt.Println(post.UserID, post.PresentationID)
		like := model.Like{
			UserID:         post.UserID,
			PresentationID: post.PresentationID,
		}

		db.First(&like, like)

		if result := db.Delete(&like); result.Error != nil {
			return c.JSON(http.StatusBadRequest, result.Error)
		}
		return c.JSON(fasthttp.StatusOK, like)
	}
}
