import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const Header = () => {
  const { search } = useLocation();

  return (
    <header>
      <nav className="navbar tabs">
        <ul>
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
              className="navbar-item is-tab"
              activeClassName="is-active"
              to={{
                pathname: '/people',
                search,
              }}
            >
              People
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
