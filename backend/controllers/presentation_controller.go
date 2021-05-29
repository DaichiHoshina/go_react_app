package controllers

import (
	"fmt"
	"net/http"

	"github.com/DaichiHoshina/go_react_app/model"
	"github.com/labstack/echo"
	"github.com/valyala/fasthttp"
	"gorm.io/gorm"
)

func GetPresentations(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var presentations []model.Presentation
		db.Model(&presentations).
			Order("created_at DESC").
			Preload("User").
			Preload("Likes").
			Find(&presentations)

		return c.JSON(fasthttp.StatusOK, presentations)
	}
}

func GetPresentation(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		if id := c.Param("id"); id != "" {
			var presentations []model.Presentation
			db.First(&presentations, id)
			return c.JSON(fasthttp.StatusOK, presentations)
		} else {
			return c.JSON(fasthttp.StatusNotFound, nil)
		}
	}
}

func UpdatePresentation(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		if id := c.Param("id"); id != "" {
			var presentation []model.Presentation
			db.First(&presentation, id)
			post := new(model.Presentation)

			if err := c.Bind(post); err != nil {
				return err
			}

			db.Model(&presentation).Update(
				"discription", post.Discription,
			).Update(
				"title", post.Title,
			)
			return c.JSON(fasthttp.StatusOK, presentation)
		} else {
			return c.JSON(fasthttp.StatusBadRequest, nil)
		}
	}
}

func DeletePresentation(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		if id := c.Param("id"); id != "" {
			var presentation []model.Presentation
			db.First(&presentation, id)
			db.Delete(&presentation)
			return c.JSON(http.StatusOK, presentation)
		} else {
			return c.JSON(http.StatusBadRequest, nil)
		}
	}
}

func CreatePresentation(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var (
			err   error
			awsS3 *model.AwsS3
			url   string
		)

		upload_file, err := c.FormFile("file")
		if err != nil {
			return err
		}

		src, err := upload_file.Open()
		if err != nil {
			return err
		}
		defer src.Close()

		awsS3 = model.NewAwsS3()

		url, err = awsS3.UploadTest(src, upload_file.Filename, "png")

		if err != nil {
			fmt.Print(err.Error())
			return err
		}

		title := c.FormValue("title")
		userId := c.FormValue("user_id")
		discription := c.FormValue("discription")

		post := new(model.Presentation)
		if err := c.Bind(post); err != nil {
			return err
		}
		presentation := model.Presentation{
			Title:       title,
			UserID:      userId,
			Discription: discription,
			Image:       url,
		}
		if result := db.Create(&presentation); result.Error != nil {
			return c.JSON(http.StatusBadRequest, result.Error)
		}
		return c.JSON(fasthttp.StatusOK, presentation)
	}
}
