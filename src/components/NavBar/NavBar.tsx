import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const NavBar: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          className={({ isActive }) => classNames('navbar-item',
            { 'has-background-grey-lighter': isActive })}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) => classNames('navbar-item',
            { 'has-background-grey-lighter': isActive })}
          to="/people"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
