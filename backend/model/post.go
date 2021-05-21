package model

import (
	"time"

	"gorm.io/gorm"
)

type Posts struct {
	Post Post `json:"posts"`
}

type Post struct {
	gorm.Model
	Title       string    `json:"title"`
	UserId      int       `json:"user_id"`
	Discription string    `json:"discription"`
	CreatedAt   time.Time `json:"created_at"`
	User        User      `gorm:"ForeignKey:UserID;AssociationForeignKey:ID"`
}
