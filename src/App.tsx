import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

import './App.scss';
import React from 'react';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
