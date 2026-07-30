import React from 'react';
import { NavLink, NavLinkRenderProps, useLocation } from 'react-router-dom';

type LocationState = {
  search?: string;
};

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/people', label: 'People' },
] as const;

const getClassName = ({ isActive }: NavLinkRenderProps) =>
  isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';

export const NavBar: React.FC = () => {
  const { search, state, pathname } = useLocation();
  const typedState = state as LocationState | null;

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
              to={{
                pathname: path,
                search:
                  path === '/people'
                    ? pathname === '/people'
                      ? search
                      : typedState?.search || ''
                    : '',
              }}
              state={
                path === '/'
                  ? { search: search || typedState?.search || '' }
                  : null
              }
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
