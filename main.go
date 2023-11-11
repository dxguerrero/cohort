package main

import (
	
	"example.com/cohort/controllers"
	"example.com/cohort/initializers"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {

	router := gin.Default()

	router.POST("/apprentices", controllers.CreateApprentice)
	router.GET("/apprentices", controllers.GetAllApprentices)
	router.GET("/apprentices/:name", controllers.GetApprentice)
	router.PUT("/apprentices/:name", controllers.UpdateApprentice)
	router.DELETE("/apprentices/:name", controllers.ApprencticeDelete)

	router.Run()
}