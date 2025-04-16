import React from 'react';

function ColumnSelector({ columns, selected, onToggle }) {
  return (
    <div>
      <h3>Select Columns</h3>
      {columns.map((col) => (
        <label key={col}>
          <input
            type="checkbox"
            checked={selected.includes(col)}
            onChange={() => onToggle(col)}
          />
          {col}
        </label>
      ))}
    </div>
  );
}
export default ColumnSelector;
