package main

import (
	"example.com/cohort/initializers"
	"example.com/cohort/models"
)

func init () {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	initializers.DB.AutoMigrate(&models.Apprentice{})
}

