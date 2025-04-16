package routes

import (
	"github.com/gin-gonic/gin"
	"myapp/handlers"
)

func SetupRoutes(r *gin.Engine) {
	r.POST("/connect", handlers.ConnectClickHouse)
	r.GET("/list-tables", handlers.ListTables)
	r.POST("/list-columns", handlers.ListColumns)
	r.POST("/preview", handlers.PreviewData)
	r.POST("/ingest", handlers.IngestData)
}
