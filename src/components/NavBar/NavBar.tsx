import React from 'react';

import { NavLink } from 'react-router-dom';

import { getClassForLink } from '../../servise';

export const NavBar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getClassForLink} to="/">
            Home
          </NavLink>

          <NavLink className={getClassForLink} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
