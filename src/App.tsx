import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar/Navbar';

export const App = memo(() => {
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
});
