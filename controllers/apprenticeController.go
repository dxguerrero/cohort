package controllers

import (

	"example.com/cohort/initializers"
	"example.com/cohort/models"
	"github.com/gin-gonic/gin"
)

// func GetSwes(c *gin.Context) {
// 	c.IndentedJSON(http.StatusOK, swes)
// }

func CreateApprentice(c *gin.Context) {
	// Get data off req body
	var body struct{
		Name string
		Language string
		Hub string
		Img string
	}

	c.Bind(&body)

	// Create an Apprentice
	apprentice := models.Apprentice{Name: body.Name, Language: body.Language, Hub: body.Hub, Img: body.Img}
	result := initializers.DB.Create(&apprentice) // pass pointer of data to Create

	if result.Error != nil {
		c.Status(400)
		return
	}

	// Return it
	c.JSON(200, gin.H{
		"apprentice": apprentice,
	})
}

