package model

type Results struct {
	UserName string `json:"name"`
	UserID   uint   `json:"user_id"`
	Presentation
	OtherName string
}
