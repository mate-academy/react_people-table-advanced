import React from 'react';
import { NavLink } from 'react-router-dom';
import { getTabClassName } from '../utils/helpers';

export const Navbar: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          className={getTabClassName}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={getTabClassName}
          to="/people"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
