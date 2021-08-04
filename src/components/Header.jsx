import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
  <header>
    <nav className="navbar is-light has-shadow">
      <NavLink
        to="/"
        exact
        className="navbar-item is-tab"
        activeClassName="is-active"
      >
        Home
      </NavLink>

      <NavLink
        to="/people"
        className="navbar-item is-tab"
        activeClassName="is-active"
      >
        People
      </NavLink>
    </nav>
  </header>
);
