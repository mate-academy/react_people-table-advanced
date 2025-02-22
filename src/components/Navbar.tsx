import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const setClass = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const Navbar: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={setClass} to="/">
            Home
          </NavLink>

          <NavLink aria-current="page" className={setClass} to="people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
