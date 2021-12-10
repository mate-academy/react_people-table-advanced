import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const Header: FC = React.memo(() => (
  <nav className="navbar">
    <div className="navbar-brand">
      <a href="/" className="navbar-item">
        <img
          src="./images/logo.png"
          alt="Mate Academy logo"
          className="logo"
        />
      </a>

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
        People Table
      </NavLink>
    </div>
  </nav>
));
