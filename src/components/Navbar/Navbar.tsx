import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getNavLinkClassNames = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
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
          <NavLink to="/" className={getNavLinkClassNames}>
            Home
          </NavLink>
          <NavLink to="/people" className={getNavLinkClassNames}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
