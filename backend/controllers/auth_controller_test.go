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
}

func TestLogin(t *testing.T) {
	url := "http://localhost:3001/auth/login"

	requestBody := model.User{
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
}

func TestLogout(t *testing.T) {
	url := "http://localhost:3001/auth/logout"

	res, err := http.Get(url)
	if err != nil {
		t.Errorf("Expected nil, got %v", err)
	}
	if res.StatusCode != http.StatusOK {
		t.Errorf("Expected status code is %d, got %d", http.StatusOK, res.StatusCode)
		t.Errorf("body is %d", res.Body)
	}
}
