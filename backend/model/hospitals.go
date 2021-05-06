package model

import "gorm.io/gorm"

type  Hospital struct {
	gorm.Model
	Name string
}
