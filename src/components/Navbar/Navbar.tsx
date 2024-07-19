import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

export enum AppRoutes {
  HOME = 'Home',
  PEOPLE = 'People',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.PEOPLE]: 'people',
};

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
          {Object.entries(RoutePath).map(
            ([routeName, path]: [string, string]) => {
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    classNames('navbar-item', {
                      'has-background-grey-lighter': isActive,
                    })
                  }
                >
                  {routeName}
                </NavLink>
              );
            },
          )}
        </div>
      </div>
    </nav>
  );
};
