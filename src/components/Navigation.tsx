import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { AppRoutes } from '../Root';

interface ActiveLink {
  isActive: boolean;
}

const getNavLinkClasses = ({ isActive }: ActiveLink): string =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const Navigation: React.FC = () => {
  const { search } = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getNavLinkClasses} to="..">
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={getNavLinkClasses}
            to={{ pathname: AppRoutes.People, search }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
