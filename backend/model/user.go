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
	ID            int            `json:"id"`
	Name          string         `json:"name"`
	Email         string         `json:"email" gorm:"unique"`
	CreatedAt     time.Time      `json:"created_at"`
	Image         string         `json:"image"`
	Password      []byte         `json:"password"`
	Presentations []Presentation `gorm:"foreignKey:UserID"`
	Likes         []Like         `gorm:"foreignKey:UserID"`
}
