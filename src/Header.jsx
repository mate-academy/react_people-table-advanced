import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <NavLink
        className="navbar-item is-tab"
        exact
        to="/"
        activeClassName="is-active"
      >
        Home page
      </NavLink>
      <NavLink
        to="/people"
        className="navbar-item is-tab"
        activeClassName="is-active"
      >
        People Table
      </NavLink>
    </div>
  </nav>
);
