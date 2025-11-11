import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

export const NavBar: React.FC = () => {
  const [searchParams] = useSearchParams();

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
              `navbar-item ${isActive ? 'is-active has-background-grey-lighter' : ''}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to={{ pathname: '/people', search: searchParams.toString() }}
            className={({ isActive }) =>
              `navbar-item ${isActive ? 'is-active has-background-grey-lighter' : ''}`
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
