import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top-touch has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            className={({ isActive }) =>
              `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) =>
              `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
