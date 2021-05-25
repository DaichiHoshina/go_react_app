package model

import (
	"gorm.io/gorm"
)

type Results struct {
	Result Result `json:"presentations"`
}

type Result struct {
	gorm.Model
	Users
	Presentations
	OtherName string
}
