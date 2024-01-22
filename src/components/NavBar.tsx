import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface NavLinkProps {
  isPending: boolean
  isActive: boolean
  isTransitioning: boolean
}

const getLinkClass = (prop: NavLinkProps) => classNames(
  'navbar-item',
  { 'has-background-grey-lighter': prop.isActive },
);

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
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>
          <NavLink to="/people" className={getLinkClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
