import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Navigation: React.FC = () => (
  <nav className="navbar App-navbar is-light has-shadow">
    <div className="wrapper">
      <div className="navbar-brand">
        <NavLink
          className={({ isActive }) => (
            classNames('navbar-item', 'is-tab', { 'is-active': isActive })
          )}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (
            classNames('navbar-item', 'is-tab', { 'is-active': isActive })
          )}
          to="/people"
        >
          People
        </NavLink>
      </div>
    </div>

  </nav>
);
