package infrastructure

import (
	"github.com/DaichiHoshina/go_react_app/controllers"
	"github.com/labstack/echo"
	"gorm.io/gorm"
)

// Init ルーティング設定
func Init(e *echo.Echo, db *gorm.DB) {
	api := e.Group("/api")
	{
		users := api.Group("/users")
		{
			users.GET("", controllers.GetUsers(db))
			users.GET("/add", controllers.CreateUser(db))
		}
	}
}
