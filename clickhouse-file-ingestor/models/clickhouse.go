// models/clickhouse.go
package models

type Table struct {
    Name    string `json:"name"`
    Columns []Column `json:"columns"`
}

type Column struct {
    Name string `json:"name"`
    Type string `json:"type"`
}
