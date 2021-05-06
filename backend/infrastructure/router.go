package infrastructure

import (
	"github.com/DaichiHoshina/go_react_app/controllers"
	"github.com/labstack/echo"
	"gorm.io/gorm"
)

// Init ルーティング設定
func Init(e *echo.Echo, db *gorm.DB) {

		users := e.Group("/users")
		{
			users.GET("", controllers.GetUsers(db))
			users.POST("", controllers.CreateUser(db))
		}
		hospitals := e.Group("/hospitals")
		{
			hospitals.GET("", controllers.GetHospitals(db))
			hospitals.POST("/add", controllers.CreateHospital(db))
		}

}
