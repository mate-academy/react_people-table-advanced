import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <main className="section">
        <div className="container">
          <Navbar />
          <Outlet />
        </div>
      </main>
    </div>
  );
};
