// services/clickhouseService.go
package services

import (
    "database/sql"
    "fmt"
    "github.com/ClickHouse/clickhouse-go/v2"
)

var db *sql.DB

func GetTables() ([]string, error) {
    rows, err := db.Query("SHOW TABLES")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    tables := []string{}
    for rows.Next() {
        var name string
        if err := rows.Scan(&name); err == nil {
            tables = append(tables, name)
        }
    }
    return tables, nil
}

func GetColumns(table string) ([]string, error) {
    query := fmt.Sprintf("DESCRIBE TABLE %s", table)
    rows, err := db.Query(query)
    if err != nil {
        return nil, err
    }

    columns := []string{}
    for rows.Next() {
        var name, typeStr, _default, _defaultType, _compression, _ttl string
        if err := rows.Scan(&name, &typeStr, &_default, &_defaultType, &_compression, &_ttl); err == nil {
            columns = append(columns, name)
        }
    }
    return columns, nil
}
