import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const HeadOfTable: React.FC = () => {
  const handleNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  };

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
