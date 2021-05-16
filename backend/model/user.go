package model

import "gorm.io/gorm"

// User ユーザ
type Users struct {
	User User `json:"users"`
}
type User struct {
	gorm.Model
	ID        uint   `json:"id"`
	Name      string `json:"name"`
	Email     string `gorm:"unique"`
	Password  string `json:"password"`
}
