import React from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navigation } from './components/Navigation';

export const App: React.FC = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);
