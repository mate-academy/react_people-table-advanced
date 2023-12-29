import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) => (
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  })
);

export const Navigation: React.FC = () => {
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
            to="/"
            className={getLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={getLinkClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
