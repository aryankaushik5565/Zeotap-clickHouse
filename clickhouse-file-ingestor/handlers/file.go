package handlers

import (
	"encoding/csv"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

func PreviewData(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File not found"})
		return
	}

	f, _ := file.Open()
	defer f.Close()

	reader := csv.NewReader(f)
	records, _ := reader.ReadAll()

	c.JSON(http.StatusOK, gin.H{
		"data": records,
	})
}

func IngestData(c *gin.Context) {
	var req struct {
		Table string `form:"table"`
	}
	file, err := c.FormFile("file")
	if err != nil || req.Table == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing file or table"})
		return
	}

	f, _ := file.Open()
	defer f.Close()

	reader := csv.NewReader(f)
	records, _ := reader.ReadAll()
	if len(records) < 2 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CSV must have header and data"})
		return
	}

	headers := records[0]
	query := fmt.Sprintf("INSERT INTO %s (%s) VALUES ", req.Table, strings.Join(headers, ","))

	vals := []string{}
	for _, row := range records[1:] {
		for i, col := range row {
			row[i] = fmt.Sprintf("'%s'", col)
		}
		vals = append(vals, fmt.Sprintf("(%s)", strings.Join(row, ",")))
	}
	finalQuery := query + strings.Join(vals, ",")
	_, err = DB.Exec(finalQuery)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "Data ingested!"})
}
