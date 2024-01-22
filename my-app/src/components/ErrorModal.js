// ErrorModal.js
import React from 'react';

const ErrorModal = ({ message, onClose }) => {
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ff4d4f',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    zIndex: '999',
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const closeStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    fontSize: '20px',
    color: '#fff',
  };

  const messageStyle = {
    color: '#fff',
    fontSize: '16px',
    marginTop: '10px',
  };

  return (
    <div style={modalStyle} className="error-modal">
      <div style={contentStyle} className="modal-content">
        <span style={closeStyle} onClick={onClose}>&times;</span>
        <p style={messageStyle}>{message}</p>
      </div>
    </div>
  );
};

export default ErrorModal;
