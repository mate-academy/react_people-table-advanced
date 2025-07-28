import React from 'react';

import { useLocation, Navigate } from 'react-router-dom';

export const PageNotFound = () => {
  const location = useLocation();

  if (location.pathname === '/home') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container">
      <h1 className="title">Page not found</h1>
    </div>
  );
};
