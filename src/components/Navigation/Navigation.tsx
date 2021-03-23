import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

export const Navigation = () => (
  <>
    <nav className="navbar">
      <NavLink
        to="/"
        exact
        className="navbar__link"
        activeClassName="is-active"
      >
        Home
      </NavLink>
      <NavLink
        to="/people"
        className="navbar__link"
        activeClassName="is-active"
      >
        People
      </NavLink>
    </nav>
  </>
);
