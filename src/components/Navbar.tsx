import React from 'react';
import { NavLink } from 'react-router-dom';

const ACTIVE = 'has-background-grey-lighter';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar" data-cy="nav" style={{ gap: 12 }}>
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? ACTIVE : undefined)}
      >
        Home
      </NavLink>

      <NavLink
        to="/people"
        className={({ isActive }) => (isActive ? ACTIVE : undefined)}
      >
        People
      </NavLink>
    </nav>
  );
};
