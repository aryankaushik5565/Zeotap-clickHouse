import React from 'react';

function TableList({ tables, onSelect }) {
  return (
    <div>
      <h3>Available Tables</h3>
      <ul>
        {tables.map((table) => (
          <li key={table} onClick={() => onSelect(table)} style={{ cursor: 'pointer' }}>{table}</li>
        ))}
      </ul>
    </div>
  );
}
export default TableList;