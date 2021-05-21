package model

import (
	"time"

	"gorm.io/gorm"
)

// User ユーザ
type Users struct {
	User User `json:"users"`
}
type User struct {
	gorm.Model
	ID        uint      `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email" gorm:"unique"`
	CreatedAt time.Time `json:"created_at"`
	Password  []byte    `json:"password"`
	Posts     []Post
}
