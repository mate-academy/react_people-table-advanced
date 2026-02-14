import React from 'react';
import { NavLink } from 'react-router-dom';

const ACTIVE_CLASS = 'has-background-grey-lighter';

export const Navbar: React.FC = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `navbar-item ${isActive ? ACTIVE_CLASS : ''}`;

  return (
    <nav className="navbar" data-cy="nav">
      <div className="container">
        <div className="navbar-menu is-active">
          <div className="navbar-start">
            <NavLink to="/" end className={getLinkClass}>
              Home
            </NavLink>

            <NavLink to="/people" className={getLinkClass}>
              People
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
