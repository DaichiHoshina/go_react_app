package controllers

import (
	"bytes"
	"encoding/json"
	"io"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/DaichiHoshina/go_react_app/backend/model"
	"github.com/labstack/echo"
	"github.com/stretchr/testify/assert"
)

func TestGetPresentations(t *testing.T) {
	db, _, err := MockDB()
	if err != nil {
		t.Fatal(err)
	}

	e := echo.New()

	req := httptest.NewRequest(
		echo.GET,
		"/presentations",
		nil,
	)

	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/presentations")

	handler := GetPresentations(db)

	res := handler(c)
	if res != nil {
		t.Errorf("Error: %v", res)
	}

	assert.Equal(t, err, nil)
	assert.Equal(t, http.StatusOK, rec.Code)
}

func TestGetPresentation(t *testing.T) {
	db, _, err := MockDB()
	if err != nil {
		t.Fatal(err)
	}

	e := echo.New()

	req := httptest.NewRequest(
		echo.GET,
		"/presentations/1",
		nil,
	)

	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/presentations/:id")
	c.SetParamNames("id")
	c.SetParamValues("1")

	handler := GetPresentation(db)

	res := handler(c)
	if res != nil {
		t.Errorf("Error: %v", res)
	}

	assert.Equal(t, err, nil)
	assert.Equal(t, http.StatusOK, rec.Code)
}

func TestCreatePresentation(t *testing.T) {
	url := "http://localhost:3001/presentations"
	fieldname := "file"
	filename := ".././IMG_7931.PNG"
	file, err := os.Open(filename)
	if err != nil {
		t.Errorf("Expected nil, got %v", err)
	}

	body := &bytes.Buffer{}

	mw := multipart.NewWriter(body)
	err = mw.WriteField("user_id", "1")

	fw, err := mw.CreateFormFile(fieldname, filename)
	if err != nil {
		t.Errorf("Expected nil, got %v", err)
	}

	_, err = io.Copy(fw, file)

	contentType := mw.FormDataContentType()

	err = mw.Close()

	res, err := http.Post(url, contentType, body)
	res.Header.Add("Content-Type", "multipart/form-data")
	if err != nil {
		t.Errorf("Expected nil, got %v", err)
	}
	if res.StatusCode != http.StatusOK {
		t.Errorf("Expected status code is %d, got %d", http.StatusOK, res.StatusCode)
		t.Errorf("body is %d", body)
	}
}

func TestUpdatePresentation(t *testing.T) {
	db, _, err := MockDB()
	if err != nil {
		t.Fatal(err)
	}

	e := echo.New()

	requestBody := model.Presentation{
		Title:       "これはタイトルです",
		Discription: "これは記事の内容です",
	}

	jsonValue, err := json.Marshal(requestBody)
	if err != nil {
		panic(err)
	}

	req := httptest.NewRequest(
		echo.PUT,
		"/presentations/1",
		bytes.NewBuffer(jsonValue),
	)
	req.Header.Set("Content-Type", "application/json")
	defer req.Body.Close()
	if err != nil {
		t.Errorf("Expected nil, got %v", err)
	}

	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/presentations/:id")
	c.SetParamNames("id")
	c.SetParamValues("1")

	handler := UpdatePresentation(db)
	res := handler(c)
	if res != nil {
		t.Errorf("Error: %v", res)
	}

	assert.Equal(t, err, nil)
	assert.Equal(t, http.StatusOK, rec.Code)
}

func TestDeletePresentation(t *testing.T) {
	db, _, err := MockDB()
	if err != nil {
		t.Fatal(err)
	}

	e := echo.New()

	req := httptest.NewRequest(
		echo.DELETE,
		"/presentations/1",
		nil,
	)

	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/presentations/:id")
	c.SetParamNames("id")
	c.SetParamValues("1")

	handler := DeletePresentation(db)

	res := handler(c)
	if res != nil {
		t.Errorf("Error: %v", res)
	}

	assert.Equal(t, err, nil)
	assert.Equal(t, http.StatusOK, rec.Code)
}
