import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const active = ({ isActive }: { isActive: boolean }) =>
    `navbar-item${isActive ? ' has-background-grey-lighter' : ''}`;

  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
      data-cy="nav"
    >
      <div className="navbar-brand">
        <NavLink to="/" className={active}>
          Home
        </NavLink>
        <NavLink to="/people" className={active}>
          People
        </NavLink>
      </div>
    </nav>
  );
};
