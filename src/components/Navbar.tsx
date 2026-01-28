import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';

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
            to={{ pathname: '/', search: location.search }}
            className={getLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to={{ pathname: '/people', search: location.search }}
            className={getLinkClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
