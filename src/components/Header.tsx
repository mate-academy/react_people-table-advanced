import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
  <>
    <header className="header">
      <nav>
        <NavLink
          to="/"
          exact
          activeClassName="is-active"
        >
          <button className="button is-dark" type="button">
            Home
          </button>
        </NavLink>
        <NavLink
          to="people"
          activeClassName="is-active"
        >
          <button className="button is-dark" type="button">
            People
          </button>
        </NavLink>
      </nav>
    </header>
  </>
);
