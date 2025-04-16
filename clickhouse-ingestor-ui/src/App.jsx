// App.js

import React, { useState } from 'react';
import ConnectionForm from './components/ConnectionForm';
import FileUploadForm from './components/FileUploadForm';
import TableList from './components/TableList';
import ColumnSelector from './components/ColumnSelector';
import DataPreview from './components/DataPreview';
import IngestionControls from './components/IngestionControls';
import StatusDisplay from './components/StatusDisplay';

function App() {
  const [sourceType, setSourceType] = useState('ClickHouse');
  const [connectionParams, setConnectionParams] = useState({});
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [status, setStatus] = useState('');
  const [recordCount, setRecordCount] = useState(0);

  const handleSourceChange = (e) => {
    setSourceType(e.target.value);
    setTables([]);
    setSelectedTable('');
    setColumns([]);
    setSelectedColumns([]);
    setPreviewData([]);
    setStatus('');
    setRecordCount(0);
  };

  const handleConnectionParams = (params) => {
    setConnectionParams(params);
  };

  const handleTablesFetched = (fetchedTables) => {
    setTables(fetchedTables);
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
  };

  const handleColumnsFetched = (fetchedColumns) => {
    setColumns(fetchedColumns);
  };

  const handleSelectedColumnsChange = (cols) => {
    setSelectedColumns(cols);
  };

  const handlePreviewFetched = (data) => {
    setPreviewData(data);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleRecordCount = (count) => {
    setRecordCount(count);
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Bidirectional Ingestion Tool</h1>

      <div>
        <label>Select Source Type: </label>
        <select value={sourceType} onChange={handleSourceChange}>
          <option value="ClickHouse">ClickHouse</option>
          <option value="FlatFile">Flat File</option>
        </select>
      </div>

      {sourceType === 'ClickHouse' ? (
        <ConnectionForm onConnect={handleConnectionParams} />
      ) : (
        <FileUploadForm onUpload={handleConnectionParams} />
      )}

      <TableList
        sourceType={sourceType}
        connectionParams={connectionParams}
        onTablesFetched={handleTablesFetched}
        onSelectTable={handleTableSelect}
      />

      {selectedTable && (
        <ColumnSelector
          sourceType={sourceType}
          connectionParams={connectionParams}
          table={selectedTable}
          onColumnsFetched={handleColumnsFetched}
          onSelectedColumnsChange={handleSelectedColumnsChange}
        />
      )}

      {selectedColumns.length > 0 && (
        <DataPreview
          sourceType={sourceType}
          connectionParams={connectionParams}
          table={selectedTable}
          columns={selectedColumns}
          onPreviewFetched={handlePreviewFetched}
        />
      )}

      {selectedColumns.length > 0 && (
        <IngestionControls
          sourceType={sourceType}
          connectionParams={connectionParams}
          table={selectedTable}
          columns={selectedColumns}
          onStatusChange={handleStatusChange}
          onRecordCount={handleRecordCount}
        />
      )}

      <StatusDisplay status={status} recordCount={recordCount} />
    </div>
  );
}

export default App;
