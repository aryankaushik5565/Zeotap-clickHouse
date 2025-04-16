import React, { useState } from 'react';

function FileUploadForm({ onFileUpload }) {
  const [file, setFile] = useState(null);

  const handleChange = (e) => setFile(e.target.files[0]);
  const handleUpload = () => onFileUpload(file);

  return (
    <div>
      <h3>Upload Flat File (CSV)</h3>
      <input type="file" accept=".csv" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
export default FileUploadForm;