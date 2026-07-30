import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';

export const Layout: React.FC = () => {
  return (
    <div data-cy="app">
      <NavBar />
      <main className="section">
        <div className="container">
          <div className="block">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
