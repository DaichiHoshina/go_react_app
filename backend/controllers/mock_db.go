package controllers

import (
	sqlmock "gopkg.in/DATA-DOG/go-sqlmock.v1"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func MockDB() (*gorm.DB, sqlmock.Sqlmock, error) {
	db, mock, err := sqlmock.New()
	if err != nil {
		return nil, nil, err
	}

	gdb, err := gorm.Open(mysql.Dialector{Config: &mysql.Config{DriverName: "mysql", Conn: db, SkipInitializeWithVersion: true}}, &gorm.Config{})
	if err != nil {
		return nil, nil, err
	}
	return gdb, mock, nil
}
