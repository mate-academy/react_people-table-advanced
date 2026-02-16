import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const ACTIVE_CLASS = 'has-background-grey-lighter';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `navbar-item ${isActive ? ACTIVE_CLASS : ''}`;

  return (
    <nav className="navbar" data-cy="nav">
      <div className="navbar-menu">
        <div className="navbar-start">
          <NavLink to="/" end className={getLinkClass}>
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
