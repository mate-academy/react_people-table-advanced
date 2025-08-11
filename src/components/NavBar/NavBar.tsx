import React from 'react';
import cn from 'classnames';

import { NavLink } from 'react-router-dom';

export const NavBar: React.FC = () => (
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
          className={({ isActive }) => cn(
            'navbar-item',
            { 'has-background-grey-lighter': isActive },
          )}
        >
          Home
        </NavLink>

        <NavLink
          to="people"
          className={({ isActive }) => cn(
            'navbar-item',
            { 'has-background-grey-lighter': isActive },
          )}
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
