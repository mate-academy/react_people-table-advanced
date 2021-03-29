import React from 'react';
import { NavLink } from 'react-router-dom';

export function Header(props) {
  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <NavLink
        className="navbar-item is-tab"
        activeClassName="is-active"
        exact
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className="navbar-item is-tab"
        activeClassName="is-active"
        to="/people"
      >
        People
      </NavLink>
    </nav>
  );
}
