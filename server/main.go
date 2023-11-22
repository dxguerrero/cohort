package main

import (
	
	"github.com/dxguerrero/cohort/controllers"
	"github.com/dxguerrero/cohort/initializers"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"time"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	router := gin.Default()

	config := cors.Config{
        AllowOrigins: []string{"http://localhost:5173"}, // Replace with your front-end origin
        AllowMethods: []string{"GET", "PUT", "POST", "DELETE", "OPTIONS"},
        AllowHeaders: []string{"Origin", "Authorization", "Content-Type"},
        ExposeHeaders: []string{"Content-Length", "Cache-Control"},
        AllowCredentials: true,
        MaxAge: 12 * time.Hour, // Set maximum age for CORS preflight cache
    }

	router.Use(cors.New(config))

	router.POST("/apprentices", controllers.CreateApprentice)
	router.GET("/apprentices", controllers.GetAllApprentices)
	router.GET("/apprentices/:name", controllers.GetApprentice)
	router.PUT("/apprentices/:name", controllers.UpdateApprentice)
	router.DELETE("/apprentices/:name", controllers.ApprencticeDelete)
	
	router.Run()
}