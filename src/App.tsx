import { NavLink, Outlet } from 'react-router-dom';

import './App.scss';
import { applyClass } from './utils/applyActiveClass';

export const App = () => {
  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink
              to="/"
              className={applyClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={applyClass}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
