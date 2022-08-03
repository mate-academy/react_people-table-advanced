import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={({ isActive }) => classNames(
              'navbar-item',
              'is-tab',
              { 'is-active': isActive },
            )}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) => classNames(
              'navbar-item',
              'is-tab',
              { 'is-active': isActive },
            )}
          >
            People
          </NavLink>
        </div>
      </nav>
    </>
  );
};
