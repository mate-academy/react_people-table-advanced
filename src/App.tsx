import { NavLink, Outlet, useLocation } from 'react-router-dom';

import './App.scss';

import classNames from 'classnames';

export const App = () => {
  const { pathname, search } = useLocation();

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
              className={({ isActive }) =>
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
              to="/people"
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <p>{pathname}</p>
        <p>{search && search.replaceAll('&', ' &')}</p>

        <Outlet />
      </main>
    </div>
  );
};
