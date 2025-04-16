import React from 'react';

function IngestionControls({ onIngest, disabled }) {
  return (
    <div>
      <button onClick={onIngest} disabled={disabled}>Start Ingestion</button>
    </div>
  );
}
export default IngestionControls;