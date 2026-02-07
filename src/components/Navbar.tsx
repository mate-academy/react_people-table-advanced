import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar = () => {
  const { search } = useLocation();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <nav
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className="navbar-item">
            <img src="logo.png" alt="Logo" width="28" height="28" />{' '}
          </NavLink>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <NavLink to="/" className={getLinkClass}>
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
      </div>
    </nav>
  );
};
