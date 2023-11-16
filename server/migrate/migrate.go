package main

import (
	"github.com/dxguerrero/cohort/initializers"
	"github.com/dxguerrero/cohort/models"
)

func init () {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	initializers.DB.AutoMigrate(&models.Apprentice{})
}

