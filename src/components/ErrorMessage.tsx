import React from 'react';

export default function ErrorMessage({ message }) {
  return (
    <div className="notification is-danger" role="alert">
      <button
        className="delete"
        onClick={() => window.location.reload()}
      ></button>
      <strong>Error:</strong> {message}
    </div>
  );
}
