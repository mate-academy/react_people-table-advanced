import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const handleIsActive = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

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
          <NavLink className={handleIsActive} to="/" end>
            Home
          </NavLink>

          <NavLink className={handleIsActive} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
