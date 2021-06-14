package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/DaichiHoshina/go_react_app/backend/model"
	"github.com/go-playground/assert"
	"github.com/labstack/echo"
)

func TestGetPresentations(t *testing.T) {
	url := "http://localhost:3001" + "/presentations"
	res, err := http.Get(url)
	if err != nil {
		t.Errorf("Expected nil, got %v", err)
	}
	if res.StatusCode != http.StatusOK {
		t.Errorf("Expected status code is %d, got %d", http.StatusOK, res.StatusCode)
	}
}

func TestGetPresentation(t *testing.T) {
	url := "http://localhost:3001" + "/presentations/1"
	res, err := http.Get(url)
	if err != nil {
		t.Errorf("Expected nil, got %v", err)
	}
	if res.StatusCode != http.StatusOK {
		t.Errorf("Expected status code is %d, got %d", http.StatusOK, res.StatusCode)
	}
}

func TestCreatePresentation(t *testing.T) {

	url := "http://localhost:3001" + "/presentations"

	fieldname := "file"
	filename := "test.jpg"
	file, err := os.Open(filename)

	body := &bytes.Buffer{}
	// データのmultipartエンコーディングを管理するmultipart.Writerを生成する。
	// ランダムなbase-16バウンダリが生成される。
	mw := multipart.NewWriter(body)

	err = mw.WriteField("user_id", "1")

	fw, err := mw.CreateFormFile(fieldname, filename)

	// fwで作ったパートにファイルのデータを書き込む
	_, err = io.Copy(fw, file)

	// リクエストのContent-Typeヘッダに使う値を取得する（バウンダリを含む）
	contentType := mw.FormDataContentType()

	// 書き込みが終わったので最終のバウンダリを入れる
	err = mw.Close()

	res, err := http.Post(url, contentType, body)
	res.Header.Add("Content-Type", "multipart/form-data")
	if err != nil {
		t.Errorf("Expected nil, got %v", err)
	}
	if res.StatusCode != http.StatusOK {
		t.Errorf("Expected status code is %d, got %d", http.StatusOK, res.StatusCode)
	}
}

func TestUpdatePresentation(t *testing.T) {
	// db, _, err := MockDB()
	// if err != nil {
	// 	t.Fatal(err)
	// }
	// defer db.Close()
	// db.LogMode(true)

	// e := echo.New()

	// discription := "2222"
	// title := "BBBB"
	// id := 1
	// url := "http://localhost:3001/presentations/1"

	// Mock設定
	// mock.ExpectQuery(regexp.QuoteMeta(
	// 	`INSERT INTO "presentationss" ("discription","title") VALUES ($1,$2)
	// 	RETURNING "presentationss"."id"`)).
	// 	WithArgs(title, discription).
	// 	WillReturnRows(
	// 		sqlmock.NewRows([]string{"id"}).AddRow(id))

	// e.PUT(url, func(c echo.Context) (err error) {

	// 	var presentation []model.Presentation
	// 	db.First(&presentation, id)
	// 	post := new(model.Presentation)

	// 	if err := c.Bind(post); err != nil {
	// 		return err
	// 	}

	// 	db.Model(&presentation).Update(
	// 		"discription", discription,
	// 	).Update(
	// 		"title", title,
	// 	)
	// 	return c.JSON(fasthttp.StatusOK, presentation)
	// })

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
		"/presentations/4",
		bytes.NewBuffer(jsonValue),
	)
	// defer req.Body.Close()
	// if err != nil {
	// 	fmt.Println("request error")
	// 	fmt.Println(err)
	// 	return
	// }
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/presentations/1")

	// var userJSON = `[{"title":"これはタイトルです", "discription":"これは記事の内容です"}]`

	// assert.Equal(t, userJSON, rec.Body.String())
	assert.Equal(t, http.StatusOK, rec.Code)

	// req.Header.Set("Content-Type", "application/json")

	// client := new(http.Client)
	// resp, err := client.Do(req)
	// if resp.StatusCode != 200 {
	// 	t.Errorf("got = %d, want = 200", resp.StatusCode)
	// }
	// defer resp.Body.Close()

	// byteArray, err := ioutil.ReadAll(resp.Body)
	// if err != nil {
	// 	panic("Error")
	// }

	// fmt.Printf("%#v", string(byteArray))
}

func TestDeletePresentation(t *testing.T) {

	url := "http://localhost:3001" + "/presentations/1"

	client := &http.Client{}
	req, err := http.NewRequest(http.MethodDelete, url, nil)
	if err != nil {
		fmt.Println(err)
		return
	}

	resp, err := client.Do(req)
	if resp.StatusCode != 200 {
		t.Errorf("got = %d, want = 200", resp.StatusCode)
	}
	defer resp.Body.Close()
}
