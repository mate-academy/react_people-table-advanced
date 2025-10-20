import classNames from 'classnames';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface Options {
  isActive: boolean;
}

const getLinkClass = ({ isActive }: Options) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const Navbar = () => {
  const location = useLocation();

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
            to={{ pathname: '/' }}
            className={getLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            to={{ pathname: '/people', search: location.search }}
            end
            className={getLinkClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
