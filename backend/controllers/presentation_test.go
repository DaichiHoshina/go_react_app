package controllers

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"testing"
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

// func TestUpdatePresentation(t *testing.T) {

// 	url := "http://localhost:3001" + "/presentations"

// 	fieldname := "file"
// 	filename := "test.jpg"
// 	file, err := os.Open(filename)

// 	body := &bytes.Buffer{}
// 	// データのmultipartエンコーディングを管理するmultipart.Writerを生成する。
// 	// ランダムなbase-16バウンダリが生成される。
// 	mw := multipart.NewWriter(body)

// 	err = mw.WriteField("user_id", "1")

// 	fw, err := mw.CreateFormFile(fieldname, filename)

// 	// fwで作ったパートにファイルのデータを書き込む
// 	_, err = io.Copy(fw, file)

// 	// リクエストのContent-Typeヘッダに使う値を取得する（バウンダリを含む）
// 	contentType := mw.FormDataContentType()

// 	// 書き込みが終わったので最終のバウンダリを入れる
// 	err = mw.Close()

// 	res, err := http.Put(url, contentType, body)
// 	res.Header.Add("Content-Type", "multipart/form-data")
// 	if err != nil {
// 		t.Errorf("Expected nil, got %v", err)
// 	}
// 	if res.StatusCode != http.StatusOK {
// 		t.Errorf("Expected status code is %d, got %d", http.StatusOK, res.StatusCode)
// 	}
// }

func TestDeletePresentation(t *testing.T) {

	url := "http://localhost:3001" + "/presentaons/1"

	// Create client
	client := &http.Client{}

	// res, err := http.Delete(url, contentType, nil)
	// res.Header.Add("Content-Type", "multipart/form-data")
	// if err != nil {
	// 	t.Errorf("Expected nil, got %v", err)
	// }
	// if res.StatusCode != http.StatusOK {
	// 	t.Errorf("Expected status code is %d, got %d", http.StatusOK, res.StatusCode)
	// }
	// Create request
	req, err := http.NewRequest("DELETE", url, nil)
	if err != nil {
		fmt.Println(err)
		return
	}

	// Fetch Request
	resp, err := client.Do(req)
	if resp.StatusCode != 400 {
		fmt.Println(err)
		fmt.Println(resp.StatusCode)
	}
	defer resp.Body.Close()

	// // Read Response Body
	// respBody, err := ioutil.ReadAll(resp.Body)
	// if err != nil {
	// 	fmt.Println(err)
	// 	return
	// }
}
