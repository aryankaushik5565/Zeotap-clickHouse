import React, { useState } from 'react';
import axios from 'axios';

function ConnectionForm({ onConnect }) {
  const [formData, setFormData] = useState({
    host: '', port: '', database: '', user: '', jwt: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleConnect = async () => {
    try {
      const response = await axios.post('http://localhost:8080/connect', formData);
      if (response.data.status === 'connected') onConnect();
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  return (
    <div>
      <h3>Connect to ClickHouse</h3>
      {Object.keys(formData).map((field) => (
        <input key={field} name={field} placeholder={field} onChange={handleChange} />
      ))}
      <button onClick={handleConnect}>Connect</button>
    </div>
  );
}
export default ConnectionForm;