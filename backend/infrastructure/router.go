package infrastructure

import (
	"github.com/DaichiHoshina/go_react_app/controllers"
	"github.com/labstack/echo"
	"gorm.io/gorm"
)

// ルーティング設定
func Init(e *echo.Echo, db *gorm.DB) {

	auth := e.Group("/auth")
	{
		auth.POST("", controllers.Register(db))
		auth.POST("/login", controllers.Login(db))
		auth.GET("/user", controllers.User(db))
		auth.GET("/logout", controllers.Logout(db))
	}

	users := e.Group("/users")
	{
		users.GET("", controllers.GetUsers(db))
		users.GET("/:id", controllers.GetUser(db))
		users.POST("", controllers.CreateUser(db))
		users.PUT("/:id", controllers.UpdateUser(db))
		users.DELETE("/:id", controllers.DeleteUser(db))
	}

	presentations := e.Group("/presentations")
	{
		presentations.GET("", controllers.GetPresentations(db))
		presentations.POST("", controllers.CreatePresentation(db))
	}

}
