import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation = () => (
  <nav className="navbar">
    <NavLink
      exact
      className="navbar-item is-tab"
      activeClassName="is-active"
      to="/"
    >
      Home page
    </NavLink>
    <NavLink
      className="navbar-item is-tab"
      activeClassName="is-active"
      to="/people"
    >
      People page
    </NavLink>
  </nav>
);
