import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
  <header>
    <nav className="navbar">
      <ul className="navbar-menu">
        <li>
          <NavLink
            to="/"
            exact
            className="navbar-item is-tab"
            activeClassName="is-active"
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/people"
            className="navbar-item is-tab"
            activeClassName="is-active"
          >
            People
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);
