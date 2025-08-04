import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
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
            className={`navbar-item ${location.pathname === '/' ? 'has-background-grey-lighter' : ''}`}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={`navbar-item ${location.pathname.startsWith('/people') ? 'has-background-grey-lighter' : ''}`}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
