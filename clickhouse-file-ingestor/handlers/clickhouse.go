package handlers

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/ClickHouse/clickhouse-go/v2"
)

var DB *sql.DB

type ConnData struct {
	Host     string `json:"host"`
	Port     string `json:"port"`
	Database string `json:"database"`
	User     string `json:"user"`
	JWT      string `json:"jwt"`
}

func ConnectClickHouse(c *gin.Context) {
	var data ConnData
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dsn := fmt.Sprintf("clickhouse://%s@%s:%s/%s?secure=true&auth_type=jwt&password=%s", data.User, data.Host, data.Port, data.Database, data.JWT)
	db, err := sql.Open("clickhouse", dsn)
	if err != nil || db.Ping() != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to ClickHouse"})
		return
	}

	DB = db
	c.JSON(http.StatusOK, gin.H{"status": "Connected to ClickHouse"})
}

func ListTables(c *gin.Context) {
	rows, err := DB.Query("SHOW TABLES")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var tables []string
	for rows.Next() {
		var table string
		rows.Scan(&table)
		tables = append(tables, table)
	}
	c.JSON(http.StatusOK, gin.H{"tables": tables})
}

func ListColumns(c *gin.Context) {
	var req struct {
		Table string `json:"table"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := fmt.Sprintf("DESCRIBE TABLE %s", req.Table)
	rows, err := DB.Query(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var columns []string
	for rows.Next() {
		var name, colType, def1, def2, def3, def4 string
		rows.Scan(&name, &colType, &def1, &def2, &def3, &def4)
		columns = append(columns, name)
	}
	c.JSON(http.StatusOK, gin.H{"columns": columns})
}
