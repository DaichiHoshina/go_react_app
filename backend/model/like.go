package model

type Likes struct {
	Like Like `json:"likes"`
}

type Like struct {
	ID             int  `json:"id"`
	UserID         uint `json:"user_id"`
	PresentationID uint `json:"presentation_id"`
}
