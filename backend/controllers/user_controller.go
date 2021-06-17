package controllers

import (
	"fmt"

	"github.com/DaichiHoshina/go_react_app/backend/model"
	"github.com/labstack/echo"
	"github.com/valyala/fasthttp"
	"gorm.io/gorm"
)

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

func UpdateUser(db *gorm.DB) echo.HandlerFunc {
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

		name := c.FormValue("name")

		postUser := model.User{
			Name:  name,
			Image: url,
		}
		// userをIDで探す
		if id := c.Param("id"); id != "" {
			var user []model.User
			db.First(&user, id)

			db.Model(&user).Update("name", postUser.Name)
			db.Model(&user).Update("image", postUser.Image)
			return c.JSON(fasthttp.StatusOK, user)
		} else {
			return c.JSON(fasthttp.StatusBadRequest, nil)
		}
	}
}
