import { Navbar } from './components/Navbar';
import React from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <Outlet />
      </div>
    </div>
  );
};
