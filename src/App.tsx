import { NavLink, Outlet } from 'react-router-dom';
import classNames from 'classnames';

import './App.scss';

export const App = () => {
  const getActiveClass = ({ isActive }: { isActive: boolean }) => (
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    })
  );

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
            <NavLink className={getActiveClass} to="/">
              Home
            </NavLink>
            <NavLink
              className={getActiveClass}
              to="people"
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
