package infrastructure

import (
	"github.com/DaichiHoshina/go_react_app/backend/controllers"
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
		users.GET("/:id", controllers.GetUser(db))
		users.POST("/:id", controllers.UpdateUser(db))
	}

	presentations := e.Group("/presentations")
	{
		presentations.GET("", controllers.GetPresentations(db))
		presentations.GET("/:id", controllers.GetPresentation(db))
		presentations.POST("", controllers.CreatePresentation(db))
		presentations.PUT("/:id", controllers.UpdatePresentation(db))
		presentations.DELETE("/:id", controllers.DeletePresentation(db))
	}

	likes := e.Group("/likes")
	{
		likes.POST("", controllers.CreateLike(db))
		likes.POST("/delete", controllers.DeleteLike(db))
	}

	health_check := e.Group("/health_check")
	{
		health_check.GET("", controllers.HealthCheck(db))
	}

}
