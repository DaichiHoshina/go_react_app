package model

import (
	"time"

	"gorm.io/gorm"
)

type Product struct {
	ID        uint      `json:"id"`
	Name      string    `json:"name" gorm:"type:varchar(255);not null"`
	Price     uint      `json:"price" gorm:"not null;default:0"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (p *Product) FirstById(id uint) (tx *gorm.DB) {
	return DB.Where("id = ?", id).First(&p)
}

func (p *Product) Create() (tx *gorm.DB) {
	return DB.Create(&p)
}

// all collums update
func (p *Product) Save() (tx *gorm.DB) {
	return DB.Save(&p)
}

func (p *Product) Updates() (tx *gorm.DB) {
	// db.Model(&product).Updates(Product{Name: "hoge", Price: 20})
	return DB.Model(&p).Updates(p)
}

func (p *Product) Delete() (tx *gorm.DB) {
	return DB.Delete(&p)
}

func (p *Product) DeleteById(id uint) (tx *gorm.DB) {
	return DB.Where("id = ?", id).Delete(&p)
}
