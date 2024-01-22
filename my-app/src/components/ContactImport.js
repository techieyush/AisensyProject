// ContactImport.js

import React, { useState } from 'react';
import api from '../services/api';
import './ContactImport.css'; // Import your CSS file

const ContactImport = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError('');
  };

  const handleImport = async () => {
    try {
      if (!file) {
        setError('Please select a file.');
        return;
      }

      const result = await api.importContacts(file);

      setSuccessMessage(result.message);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="contact-import-container">
      <input type="file" onChange={handleFileChange} />
      <button className="import-button" onClick={handleImport}>
        Import Contacts
      </button>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default ContactImport;
