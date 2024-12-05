// #region imports
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import './App.scss';
// #endregion

export const App = () => {
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];

    html.classList.add('has-navbar-fixed-top');
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
