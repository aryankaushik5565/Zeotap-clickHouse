package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"myapp/routes"
)

func main() {
	r := gin.Default()
	r.Use(cors.Default())
	routes.SetupRoutes(r)
	r.Run(":8080")
}
