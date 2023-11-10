package main

import (
	"net/http"

	"example.com/cohort/controllers"
	"example.com/cohort/initializers"
	"github.com/gin-gonic/gin"
)

// swe represents data about a SWE apprentice
type swe struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Language string `json:"language"`
	Hub      string `json:"hub"`
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

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {

	router := gin.Default()
	router.GET("/swes", getSwes)
	router.GET("/swes/:name", getSweByName)
	router.GET("/swes/language/:language", getSwesByLanguage)
	router.POST("/swes", postSwe)
	router.DELETE("/swes/:name", deleteSWE)
	router.PUT("/swes/:name", updateSwe)

	router.POST("/apprentices", controllers.CreateApprentice)

	router.Run()
}

// getSwes responds with the list of all SWE apprentices
func getSwes(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, swes)
}

// postSwes adds a SWE from JSON recieved in the request body
func postSwe(c *gin.Context) {
	var newSwe swe

	//Call BindJSON to bind the received JSON to newSWE
	if err := c.BindJSON(&newSwe); err != nil {
		return
	}

	// Add the new SWE to the slice
	swes = append(swes, newSwe)
	c.IndentedJSON(http.StatusCreated, newSwe)
}

// getSweByName locates SWE apprentice whose name value matches
// the name parameter sent by the client, then returns that SWE
// as a response
func getSweByName(c *gin.Context) {
	name := c.Param("name")

	// Loop over the list of SWEs, looking for
	// a SWE whos Name value matches the parameter
	for _, s := range swes {
		if s.Name == name {
			c.IndentedJSON(http.StatusOK, s)
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "SWE not found"})
}

// getSwesByLanguage locates SWEs apprentice whose language value matches
// the language parameter sent by the client, adds them to a slice
// and returns that slice
func getSwesByLanguage(c *gin.Context) {
	language := c.Param("language")
	var langSwes []swe

	// Loop over the list of SWEs, looking for
	// a SWE whos Name value matches the parameter
	for _, s := range swes {
		if s.Language == language {
			langSwes = append(langSwes, s)
		}
	}

	if langSwes != nil {
		c.IndentedJSON(http.StatusOK, langSwes)
	} else {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "No SWES are currently learning that language"})
	}
}

// deleteSwe locates a SWE apprentice whose name value matches
// the name parameter sent by the client, and removes it from the
// swes slice
func deleteSWE(c *gin.Context) {
	name := c.Param("name")

	// Loop over the list of SWES, looking for
	// a SWE whos Name value matches the parameter
	for i, s := range swes {
		if s.Name == name {
			swes = append(swes[:i], swes[i+1:]...)
			c.IndentedJSON(http.StatusOK, gin.H{"message": "User deleted successfully."})
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "SWE not found"})
}

// updateSwe locates SWE whose name value matches the name
// parameter sent by the client, and updates it with the data
// passed into request
func updateSwe(c *gin.Context) {
	name := c.Param("name")
	var updatedSwe swe

	if err := c.BindJSON(&updatedSwe); err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "There was an error updating the SWE"})
	}

	for i, s := range swes {
		if s.Name == name {
			swes[i] = updatedSwe
			c.IndentedJSON(http.StatusOK, swes[i])
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "SWE not found"})
}
