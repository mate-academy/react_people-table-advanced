import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const getClassNameLink = ({ isActive }: { isActive: boolean }) => {
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
          <NavLink className={getClassNameLink} to="/">
            Home
          </NavLink>

          <NavLink className={getClassNameLink} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
