import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const isLinkActive = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={isLinkActive} to="/">
            Home
          </NavLink>

          <NavLink aria-current="page" className={isLinkActive} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
