import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.scss';
import { Navigation } from './components/Navigation';

export const App: React.FC = () => (
  <div data-cy="app">
    <Navigation />

    <div className="section">
      <div className="container">
        <Outlet />
      </div>
    </div>
  </div>
);
