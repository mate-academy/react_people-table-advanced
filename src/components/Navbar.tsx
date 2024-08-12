import React from 'react';
import { NavLink } from 'react-router-dom';
import { getNavbarClassName } from '../utils/functions';

export const Navbar: React.FC = () => {
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
            className={({ isActive }) => getNavbarClassName(isActive)}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) => getNavbarClassName(isActive)}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
