import './App.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { NavBar } from './components';

export const App = () => (
  <div data-cy="app">
    <NavBar />
    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);
