import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

export const Header = () => (
  <header>
    <nav className="Navigation">
      <NavLink
        to="/"
        exact
        className="Navigation__link"
        activeClassName="active"
      >
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/people"
        className="Navigation__link"
        activeClassName="active"
      >
        <span>People</span>
      </NavLink>
    </nav>
  </header>
);
