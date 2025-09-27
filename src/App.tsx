import cn from 'classnames';

import './App.scss';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

export const App = () => {
  const location = useLocation();

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
              className={cn('navbar-item', {
                'has-background-grey-lighter': location.pathname === '/',
              })}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={cn('navbar-item', {
                'has-background-grey-lighter':
                  location.pathname.startsWith('/people'),
              })}
              to={{ pathname: '/people', search: location.search }}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <Outlet />
      </main>
    </div>
  );
};
