package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

// swe represents data about a SWE apprentice
type swe struct {
	ID string `json:"id"`
	Name string `json:"name"`
	Language string `json:"language"`
	Hub string `json:"hub"`
}

// slice to seed SWE apprentices
var swes = []swe{
	{ID: "1", Name: "Aaron", Language: "Go", Hub: "AUS"},
	{ID: "2", Name: "Arwa", Language: "TypeScript", Hub: "CHI"},
	{ID: "3", Name: "Axel", Language: "C++", Hub: "NYC"},
	{ID: "4", Name: "Courtlyn", Language: "Kotlin", Hub: "ATL"},
	{ID: "5", Name: "Daniel", Language: "Go", Hub: "ATL"},
	{ID: "6", Name: "Daniela", Language: "TypeScript", Hub: "CHI"},
	{ID: "7", Name: "Dominique", Language: "Java", Hub: "AUS"},
	{ID: "8", Name: "Jazmin", Language: "Java", Hub: "CHI"},
	{ID: "9", Name: "Lavon", Language: "C++", Hub: "ATL"},
	{ID: "10", Name: "Meagan", Language: "Python", Hub: "NYC"},
	{ID: "11", Name: "Michael", Language: "Java", Hub: "AUS"},
	{ID: "12", Name: "Sarai", Language: "Java", Hub: "CHI"},
	{ID: "13", Name: "Senai", Language: "Kotlin", Hub: "ATL"},
	{ID: "14", Name: "Shami", Language: "TypeScript", Hub: "NYC"},
	{ID: "15", Name: "Tina", Language: "Java", Hub: "NYC"},
	{ID: "16", Name: "Zoe", Language: "Java", Hub: "AUS"},
}


func main() {
	router := gin.Default()
	router.GET("/swes", getSwes)
	router.POST("/swes", postSwe)

	router.Run("localhost:8080")
}

// getSwes responds with the list of all SWE apprentices
func getSwes(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, swes)
}

// postSwes adds a SWE from JSON recieved in the request body
func postSwe(c *gin.Context) {
	var newSwe swe

	//Call BindJSON to bing the received JSON to newSWE
	if err := c.BindJSON(&newSwe); err != nil {
		return
	} 
	
	// Add the new SWE to the slice
	swes = append(swes, newSwe)
	c.IndentedJSON(http.StatusCreated, newSwe)
}





