import { NavLink, useSearchParams, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';

export const Navbar = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const isOnPeoplePage = location.pathname.startsWith('/people');

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
            to="/"
            className={({ isActive }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
          >
            Home
          </NavLink>

          <NavLink
            to={{
              pathname: '/people',
              search: isOnPeoplePage ? searchParams.toString() : '',
            }}
            className={({ isActive }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
