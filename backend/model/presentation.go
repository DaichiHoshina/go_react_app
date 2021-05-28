package model

import (
	"time"

	"gorm.io/gorm"
)

type Presentations struct {
	Presentation Presentation `json:"presentations"`
}

type Presentation struct {
	gorm.Model
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	UserID      string    `json:"user_id"`
	Discription string    `json:"discription"`
	Image       string    `json:"iamge"`
	CreatedAt   time.Time `json:"created_at"`
	User        User      `json:"user"`
	Likes       []Like    `json:"likes" gorm:"foreignKey:PresentationID"`
}
