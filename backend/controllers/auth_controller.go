// authController.go
package controllers

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/DaichiHoshina/go_react_app/model"
	"github.com/dgrijalva/jwt-go"
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
			jsonMap := map[string]string{
				"message": "post error",
			}
			return c.JSON(http.StatusNotFound, jsonMap)
		}
		var user model.User

		// データが存在しなかった場合
		db.Where("email = ?", post.Email).First(&user)
		if user.ID == 0 {
			jsonMap := map[string]string{
				"message": "User not found",
			}
			return c.JSON(http.StatusNotFound, jsonMap)
		}

		// パスワードのチェック
		if err := bcrypt.CompareHashAndPassword(user.Password, []byte(post.Password)); err != nil {
			jsonMap := map[string]string{
				"message": "Incorrect password",
			}
			return c.JSON(http.StatusNotFound, jsonMap)
		}

		// JWT
		claims := jwt.StandardClaims{
			Issuer:    strconv.Itoa(int(user.ID)),
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		}
		jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		token, err := jwtToken.SignedString([]byte("secret"))
		if err != nil {
			jsonMap := map[string]string{
				"message": "JWT error",
			}
			return c.JSON(http.StatusNotFound, jsonMap)
		}

		// Cookie
		cookie := new(http.Cookie)
		cookie.Name = "jwt"
		cookie.Value = token
		cookie.SameSite = http.SameSiteNoneMode
		cookie.Path = "/"
		cookie.Expires = time.Now().Add(24 * time.Hour)
		cookie.Secure = true
		cookie.HttpOnly = true
		c.SetCookie(cookie)

		fmt.Println(c.Cookie("jwt"))

		return c.JSON(fasthttp.StatusOK, token)
	}
}

type Claims struct {
	jwt.StandardClaims
}

func User(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {

		// cookie取得
		cookie, err := c.Cookie("jwt")
		if err != nil {
			jsonMap := map[string]string{
				"message": "cookie is not found",
			}
			return c.JSON(http.StatusNotFound, jsonMap)
		}

		// token取得
		token, err := jwt.ParseWithClaims(cookie.Value, &Claims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte("secret"), nil
		})
		if err != nil || !token.Valid {
			jsonMap := map[string]string{
				"message": "user is not login",
			}
			return c.JSON(http.StatusNotFound, jsonMap)
		}

		claims := token.Claims.(*Claims)
		// User IDを取得
		id := claims.Issuer

		var user model.User
		db.Where("id = ?", id).First(&user)

		return c.JSON(fasthttp.StatusOK, user)
	}
}

func Logout(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		// Cookie
		cookie := new(http.Cookie)
		cookie.Name = "jwt"
		cookie.Value = ""
		cookie.Expires = time.Now().Add(-time.Hour) // マイナス値を入れて期限切れにする
		c.SetCookie(cookie)

		jsonMap := map[string]string{
			"message": "success",
		}

		return c.JSON(fasthttp.StatusOK, jsonMap)
	}
}
