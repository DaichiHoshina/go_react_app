package model

import "gorm.io/gorm"

// User ユーザ
type User struct {
	gorm.Model
	Id   int    `json:"id" gorm:"primary_key;AUTO_INCREMENT"`
	Name string `json:"text"`
}
