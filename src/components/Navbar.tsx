import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const ACTIVE = 'has-background-grey-lighter';

export const Navbar: React.FC = () => {
  const { search } = useLocation();

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
        to={{ pathname: '/people', search }}
        className={({ isActive }) => (isActive ? ACTIVE : undefined)}
      >
        People
      </NavLink>
    </nav>
  );
};
