import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';

const getNavActive = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getNavActive} to="/">
            Home
          </NavLink>

          <NavLink className={getNavActive} to="/people" aria-current="page">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
