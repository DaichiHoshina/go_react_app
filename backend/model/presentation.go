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
	ID       		int    		`json:"id"`
	Title       string    `json:"title"`
	UserID      uint      `json:"user_id"`
	Discription string    `json:"discription"`
	CreatedAt   time.Time `json:"created_at"`
}
