import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar: React.FC = () => {
  const { search } = useLocation();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
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
          <NavLink to="/" className={getLinkClass} end>
            Home
          </NavLink>

          <NavLink
            to={{
              pathname: '/people',
              search,
            }}
            className={getLinkClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
