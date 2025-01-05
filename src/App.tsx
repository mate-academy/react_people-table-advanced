import { Navbar } from './components/Navbar';
import { Outlet } from 'react-router-dom';

import './App.scss';
import { useEffect } from 'react';

export const App = () => {
  useEffect(() => {
    document.body.classList.add('has-navbar-fixed-top');

    return () => {
      document.body.classList.remove('has-navbar-fixed-top');
    };
  }, []);

  return (
    <div data-cy="app">
      <Navbar />

      <div className='section'>
        <div className='container'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
