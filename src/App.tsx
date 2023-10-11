import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar';

export const App: React.FC = () => (
  <div data-cy="app">
    <main className="section">
      <div className="container">
        <Navbar />
        <Outlet />
      </div>
    </main>
  </div>
);
