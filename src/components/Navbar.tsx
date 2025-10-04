// src/components/Navbar.tsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
      data-cy="nav"
    >
      <div
        className="box mb-4"
        style={{ margin: '0', padding: '0 40px', width: '100%' }}
      >
        <div className="navbar-brand">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navbar-item${isActive ? ' has-background-grey-lighter' : ''}`
            }
            data-cy="nav-home"
          >
            Home
          </NavLink>

          <NavLink
            to={`/people${location.search}`}
            end
            className={({ isActive }) =>
              `navbar-item${isActive ? ' has-background-grey-lighter' : ''}`
            }
            data-cy="nav-people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
