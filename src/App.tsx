import { Navbar } from './components/Navbar';

import './App.scss';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <Navbar />
      </nav>
      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
