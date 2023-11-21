import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const Navbar: React.FC = () => {
  const getClassName = ({ isActive }: { isActive: boolean }) => {
    return cn('navbar-item', {
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
            className={getClassName}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={getClassName}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
