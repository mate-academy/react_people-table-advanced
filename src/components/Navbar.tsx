import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

const activeLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const NavBar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={activeLinkClass} to="/">
            Home
          </NavLink>

          <NavLink className={activeLinkClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
