import cn from 'classnames';
import React from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const currLocationLink = useLocation();
  const [searchParameters] = useSearchParams() || '';

  const getLinkClass = (
    { isActive }: { isActive: boolean },
  ) => cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            className={cn('navbar-item', {
              'has-background-grey-lighter': currLocationLink.pathname === '/',
            })}
            to="/"
            replace
          >
            Home
          </NavLink>

          <NavLink
            className={getLinkClass}
            to={`/people?${searchParameters.toString()}`}
            replace
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
