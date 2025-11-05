import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  return (
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
              'navbar-item' + (isActive ? ' has-background-grey-lighter' : '')
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            to={{
              pathname: '/people',
              search: location.pathname.startsWith('/people')
                ? location.search
                : '',
            }}
            className={({ isActive }) =>
              'navbar-item' + (isActive ? ' has-background-grey-lighter' : '')
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
