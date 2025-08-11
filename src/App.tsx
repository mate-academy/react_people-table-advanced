import React from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <NavBar />
      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
