import "testing"

type Presentation struct{}

func (u *Presentation) FindAll() ([]model.Presentation, error) {
	presentations := []model.Presentation{}
	t, _ := time.Parse("2006-01-02", "2021-01-01")

	presentation1 := model.Presentation{Title: "Go言語の本", Discription: "誰か"}
	presentation1.ID = 1
	presentation1.UserId = 1
	presentation1.CreatedAt = t
	presentation1.UpdatedAt = t
	presentations = append(presentations, presentation1)

	// b2 := model.Presentation{Title: "Go言語の本2", Author: "誰か2"}
	// b2.ID = 2
	// b2.CreatedAt = t
	// b2.UpdatedAt = t
	// presentations = append(presentations, b2)

	return presentations, nil
}

func TestGetIndex(t *testing.T) {
	e := echo.New()
	presentations := &Presentation{}
	h := NewPresentationHandler(presentations)
	e.GET("/presentations", h.GetIndex)

	apitest.New().
		Handler(e).
		Get("/presentations").
		Expect(t).
		Body(`
          {
              "Presentations": [
                  {
                      "ID": 1,
                      "CreatedAt": "2021-01-01T00:00:00Z",
                      "UpdatedAt": "2021-01-01T00:00:00Z",
                      "DeletedAt": null,
                      "Title": "Go言語の本",
                      "Discription": "誰か"
                  },
              ]
          }
      `).
		Status(http.StatusOK).
		End()
}
