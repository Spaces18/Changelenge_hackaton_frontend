import React, { useState } from 'react';
import { submitHomework } from '../services/api';

function HomeworkForm({ taskId, userEmail }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !userEmail) return setError('File and login required');
    try {
      await submitHomework(taskId, userEmail, file);
      setSuccess('Submitted successfully!');
      setFile(null);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Submit Homework</button>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default HomeworkForm;