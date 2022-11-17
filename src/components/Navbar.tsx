import classNames from 'classnames';
import React from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const parentPath = location.pathname;

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
            className={({ isActive }) => (
              classNames(
                'navbar-item',
                { 'has-background-grey-lighter': isActive },
              )
            )}
          >
            Home
          </NavLink>

          <NavLink
            to={{
              pathname: parentPath,
              search: searchParams.toString(),
            }}
            className={({ isActive }) => (
              classNames(
                'navbar-item',
                { 'has-background-grey-lighter': isActive },
              )
            )}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
