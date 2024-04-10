import React, { useEffect } from 'react';
import './Snackbar.css';

const Snackbar = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // Auto-close after 2 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className="snackbar">{message}</div>;
};

export default Snackbar;
