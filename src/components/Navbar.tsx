import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';

export const Navbar = () => {
  const location = useLocation();
  const search = location.search;
  const isPeoplePage = location.pathname.startsWith('/people');

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
              cn('navbar-item', { 'has-background-grey-lighter': isActive })
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              cn('navbar-item', { 'has-background-grey-lighter': isActive })
            }
            to={isPeoplePage ? `/people${search}` : `people`}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
