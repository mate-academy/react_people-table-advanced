import { Navbar } from './components/Navbar';

import './App.scss';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

export const App = () => {
  useEffect(() => {
    document.documentElement.classList.add('has-navbar-fixed-top');
  }, []);

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
