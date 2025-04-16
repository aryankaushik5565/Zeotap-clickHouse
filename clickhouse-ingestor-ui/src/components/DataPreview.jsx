import React from 'react';

function DataPreview({ data }) {
  return (
    <div>
      <h3>Data Preview</h3>
      <table border="1">
        <thead>
          <tr>{Object.keys(data[0] || {}).map((key) => <th key={key}>{key}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>{Object.values(row).map((val, j) => <td key={j}>{val}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default DataPreview;
