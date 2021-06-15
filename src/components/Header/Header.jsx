import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
  <nav className="navbar">
    <div className="navbar-brand">
      <NavLink
        className="navbar-item is-tab"
        to="/"
        activeClassName="is-active"
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
