package controllers

import (

	"example.com/cohort/initializers"
	"example.com/cohort/models"
	"github.com/gin-gonic/gin"
)

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

func GetAllApprentices(c *gin.Context) {
	// Get apprentices
	var apprentices []models.Apprentice
	initializers.DB.Find(&apprentices)
	// Respond with them
	c.JSON(200, gin.H{
		"apprentices": apprentices,
	})
}

func GetApprentice(c *gin.Context) {
	// Get name from url
	name := c.Param("name")

	// Get an apprentice
	var apprentice models.Apprentice
	initializers.DB.Where("Name = ?", name).Find(&apprentice)

	// Respond with them
	c.JSON(200, gin.H{
		"apprentice": apprentice,
	})
}

func UpdateApprentice(c *gin.Context) {
	// Get name from url
	name := c.Param("name")

	// Get the data from req body
	var body struct{
		Name string
		Language string
		Hub string
		Img string
	}

	c.Bind(&body)

	// Find apprentice we are updating
	var apprentice models.Apprentice
	initializers.DB.Where("Name = ?", name).Find(&apprentice)

	// Update it
	initializers.DB.Model(&apprentice).Updates(models.Apprentice{
		Name: body.Name,
		Language: body.Language,
		Hub: body.Hub,
		Img: body.Img,
	})

	// Respond with it
	c.JSON(200, gin.H{
		"apprentice": apprentice,
	})
}

func ApprencticeDelete(c *gin.Context) {
	// Get name from url
	name := c.Param("name")

	// Delete Apprentice
	var apprentice models.Apprentice
	initializers.DB.Where("Name = ?", name).Delete(&apprentice)
	// Respond
	c.Status(200)
}