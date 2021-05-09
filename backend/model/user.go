package model

import "gorm.io/gorm"

// User ユーザ
type Users struct {
	User User `json:"users"`
}
type User struct {
	gorm.Model
	Id   int    `json:"id" gorm:"primary_key;AUTO_INCREMENT"`
	Name string `json:"name"`
}
