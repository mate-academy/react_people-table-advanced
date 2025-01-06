import cn from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

const setLinkClassName = ({ isActive }: { isActive: boolean }) => {
  return cn('navbar-item', { 'has-background-grey-lighter': isActive });
};

export const NavBar: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={setLinkClassName}>
            Home
          </NavLink>

          <NavLink to="/people" className={setLinkClassName}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
