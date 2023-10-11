import React from 'react';
import { NavLink } from 'react-router-dom';
import { handleNavLinkClass } from '../../utils/handleNavLinkClass';

export const HeadOfTable: React.FC = () => {
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
            className={handleNavLinkClass}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={handleNavLinkClass}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
