import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => (
  <nav className="navbar">
    <div className="navbar-container">
      <NavLink
        className="navbar-item is-tab"
        activeClassName="is-active"
        to="/"
        exact
      >
        Home
      </NavLink>
      <NavLink
        className="navbar-item is-tab"
        to="/people"
        activeClassName="is-active"
      >
        People
      </NavLink>
    </div>
  </nav>
);
