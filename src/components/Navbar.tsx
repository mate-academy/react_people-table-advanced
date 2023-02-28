import cn from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = React.memo(() => {
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
            className={({ isActive }) => cn('navbar-item', {
              'has-background-grey-lighter': isActive,
            })}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            aria-current="page"
            className={({ isActive }) => cn('navbar-item', {
              'has-background-grey-lighter': isActive,
            })}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
});
