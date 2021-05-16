// authController.go
package controllers

import (
	"net/http"

	"github.com/DaichiHoshina/go_react_app/model"
	"github.com/labstack/echo"
	"github.com/valyala/fasthttp"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func Register(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		post := new(model.User)
		if err := c.Bind(post); err != nil {
			return err
		}

		// パスワードをエンコード
		password, _ := bcrypt.GenerateFromPassword([]byte(post.Password), 14)

		user := model.User{
			Name:     post.Name,
			Email:    post.Email,
			Password: password,
		}

		db.Create(&user)
		return c.JSON(fasthttp.StatusOK, user)
	}
}

func Login(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		post := new(model.User)
		if err := c.Bind(post); err != nil {
			return err
		}
		var user model.User

		// データが存在しなかった場合
		db.Where("email = ?", post.Email).First(&user)
		if user.ID == 0 {
			return c.JSON(http.StatusNotFound, "User not found")
		}

		// パスワードのチェック
		if err := bcrypt.CompareHashAndPassword(user.Password, []byte(post.Password)); err != nil {
			return c.JSON(http.StatusNotFound, "Incorrect password")
		}

		return c.JSON(fasthttp.StatusOK, user)
	}
}
