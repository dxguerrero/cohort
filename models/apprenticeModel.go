package models

import "gorm.io/gorm"

type Apprentice struct {
	gorm.Model
	Name string
	Language string
	Hub string
	Img string
}

