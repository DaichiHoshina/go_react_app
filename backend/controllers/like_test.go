package controllers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/DaichiHoshina/go_react_app/backend/model"
	"github.com/labstack/echo"
	"github.com/stretchr/testify/assert"
)

func TestCreateLike(t *testing.T) {
	url := "http://localhost:3001/likes"

	db, _, err := MockDB()
	if err != nil {
		t.Fatal(err)
	}

	e := echo.New()

	requestBody := model.Like{
		UserID:         1,
		PresentationID: 1,
	}

	jsonValue, err := json.Marshal(requestBody)
	if err != nil {
		panic(err)
	}

	req, err := http.NewRequest(
		echo.POST,
		url,
		bytes.NewBuffer(jsonValue),
	)
	req.Header.Set("Content-Type", "application/json")
	defer req.Body.Close()
	if err != nil {
		t.Errorf("Expected nil, got %v", err)
	}

	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/likes")
	if rec.Code != 200 {
		t.Errorf("Expected nil, got %v", rec.Body)
	}

	handler := CreateLike(db)
	res := handler(c)
	if res != nil {
		t.Errorf("Error: %v", res)
	}

	assert.Equal(t, err, nil)
	assert.Equal(t, res, nil)
}

func TestDeleteLike(t *testing.T) {
	url := "http://localhost:3001/likes/delete"

	db, _, err := MockDB()
	if err != nil {
		t.Fatal(err)
	}

	e := echo.New()

	requestBody := model.Like{
		UserID:         1,
		PresentationID: 1,
	}

	jsonValue, err := json.Marshal(requestBody)
	if err != nil {
		panic(err)
	}

	req, err := http.NewRequest(
		echo.POST,
		url,
		bytes.NewBuffer(jsonValue),
	)
	req.Header.Set("Content-Type", "application/json")
	defer req.Body.Close()
	if err != nil {
		t.Errorf("Expected nil, got %v", err)
	}

	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/likes/delete")
	if rec.Code != 200 {
		t.Errorf("Expected nil, got %v", rec.Body)
	}

	handler := CreateLike(db)
	res := handler(c)
	if res != nil {
		t.Errorf("Error: %v", res)
	}

	assert.Equal(t, err, nil)
	assert.Equal(t, res, nil)
}
