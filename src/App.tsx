import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.scss';
import { Navbar } from './components/NavBar';

export const App: React.FC = () => (
  <div data-cy="app">
    <Navbar />

    <div className="section">
      <div className="container">
        <Outlet />
      </div>
    </div>
  </div>
);
