package controllers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"testing"

	"github.com/DaichiHoshina/go_react_app/backend/model"
)

func TestRegister(t *testing.T) {
	url := "http://localhost:3001/auth"

	requestBody := model.User{
		Name:     "田中太郎",
		Email:    "test1234@test.jp",
		Password: ([]byte("test1234")),
	}

	jsonValue, err := json.Marshal(requestBody)
	if err != nil {
		panic(err)
	}

	res, err := http.Post(url, "application/json", bytes.NewBuffer(jsonValue))
	if err != nil {
		t.Errorf("Expected nil, got %v", err)
	}
	if res.StatusCode != http.StatusOK {
		t.Errorf("Expected status code is %d, got %d", http.StatusOK, res.StatusCode)
		t.Errorf("body is %d", res.Body)
	}

	// req := httptest.NewRequest(
	// 	echo.PUT,
	// 	"/presentations/1",
	// 	bytes.NewBuffer(jsonValue),
	// )
	// req.Header.Set("Content-Type", "application/json")
	// defer req.Body.Close()
	// if err != nil {
	// 	t.Errorf("Expected nil, got %v", err)
	// }

	// rec := httptest.NewRecorder()
	// c := e.NewContext(req, rec)
	// c.SetPath("/presentations/:id")
	// c.SetParamNames("id")
	// c.SetParamValues("1")

	// handler := UpdateUser(db)
	// res := handler(c)
	// if res != nil {
	// 	t.Errorf("Error: %v", res)
	// }

	// assert.Equal(t, err, nil)
	// assert.Equal(t, http.StatusOK, rec.Code)
}
