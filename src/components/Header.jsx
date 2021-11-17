import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
  <header>
    <nav className="navbar">
      <NavLink
        to="/"
        exact
        className="navbar-item"
        activeClassName="is-active"
      >
        Home
      </NavLink>

      <NavLink
        to="/people"
        className="navbar-item"
        activeClassName="is-active"
      >
        People
      </NavLink>
    </nav>
  </header>
);
