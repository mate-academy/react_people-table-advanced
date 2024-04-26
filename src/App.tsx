import { NavLink, Outlet, useLocation } from 'react-router-dom';

import './App.scss';

import classNames from 'classnames';

export const App = () => {
  const { search } = useLocation();

  return (
    <div data-cy="app">
      <div className="section">
        {/* <p>{pathname}</p> */}
        <p>{search && search.replaceAll('&', ' &')}</p>
      </div>
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
      <Outlet />
    </div>
  );
};
