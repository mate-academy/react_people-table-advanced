import React from 'react';
import { NavLink, NavLinkRenderProps } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/people', label: 'People' },
] as const;

const getClassName = ({ isActive }: NavLinkRenderProps) =>
  isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';

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
          {NAV_ITEMS.map(({ path, label }) => (
            <NavLink
              key={path}
              className={getClassName}
              to={path}
              end={path === '/'}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
