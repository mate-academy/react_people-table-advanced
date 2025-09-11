import * as React from 'react';

import { Navigation } from './components/Navigation';

import './App.scss';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <div className="section">
        <div className="section">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
