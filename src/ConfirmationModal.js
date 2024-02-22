import React from 'react';

function ConfirmationModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
      <p>{message}</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onClose}>No</button>
    </div>
  );
}

export default ConfirmationModal;
