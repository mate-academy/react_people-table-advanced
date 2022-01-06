import React from 'react';
import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './Header.scss';

export const Header: React.FC = () => (
  <nav
    className="navbar is-primary"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="navbar-brand">
      <a className="navbar-item" href="./">
        <img
          src="https://static.codedojo.ru/assets/images/topics/react.png"
          alt="logo"
        />
      </a>
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <NavLink
          to="/"
          className={({ isActive }) => classNames('navbar-item', {
            'navbar-item--active': isActive,
          })}
        >
          Home
        </NavLink>

        <NavLink
          to="/people"
          className={({ isActive }) => classNames('navbar-item', {
            'navbar-item--active': isActive,
          })}
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
