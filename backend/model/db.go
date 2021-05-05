package model

import (
	"log"

	"github.com/selegee/app2/config"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB
var err error

func init() {
	// connect DB
	conf := config.Config
	dsn := conf.DbUser + ":" + conf.DbPassword + "@tcp(" + conf.DbHost + ":" + conf.DbPort + ")/" + conf.DbName + "?charset=utf8mb4&parseTime=True&loc=Local"
	// dsn := "root:root@tcp(127.0.0.1:8889)/app2?charset=utf8mb4&parseTime=True&loc=Local"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{}) // NOTE: using = to global var , := is only this function
	if err != nil {
		log.Fatalln(dsn + "database can't connect")
	}
	DB.AutoMigrate(&Product{})
}
