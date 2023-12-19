import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

const ACTIVE_LINK = 'has-background-grey-lighter';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return cn('navbar-item', {
    [ACTIVE_LINK]: isActive,
  });
};

export const Navbar: React.FC = () => {
  const [params] = useSearchParams();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-brand">
            <NavLink
              to="/"
              className={getLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to={{
                pathname: '/people',
                search: params.toString(),
              }}
              className={getLinkClass}
            >
              People
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
