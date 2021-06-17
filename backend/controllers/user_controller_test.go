package controllers

import (
	"bytes"
	"io"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/labstack/echo"
	"github.com/stretchr/testify/assert"
)

func TestGetUser(t *testing.T) {
	db, _, err := MockDB()
	if err != nil {
		t.Fatal(err)
	}

	e := echo.New()

	req := httptest.NewRequest(
		echo.GET,
		"/users/1",
		nil,
	)

	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/users/:id")
	c.SetParamNames("id")
	c.SetParamValues("1")

	handler := GetUser(db)

	res := handler(c)
	if res != nil {
		t.Errorf("Error: %v", res)
	}

	assert.Equal(t, err, nil)
	assert.Equal(t, http.StatusOK, rec.Code)
}

func TestUpdateUser(t *testing.T) {
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

	db, _, err := MockDB()
	if err != nil {
		t.Fatal(err)
	}

	e := echo.New()

	req := httptest.NewRequest(
		echo.PUT,
		"/users/1",
		body,
	)
	req.Header.Add("Content-Type", contentType)
	defer req.Body.Close()
	if err != nil {
		t.Errorf("Expected nil, got %v", err)
	}

	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/users/:id")
	c.SetParamNames("id")
	c.SetParamValues("1")

	handler := UpdateUser(db)
	res := handler(c)
	if res != nil {
		t.Errorf("Error: %v", res)
	}

	assert.Equal(t, err, nil)
	assert.Equal(t, res, nil)
}
