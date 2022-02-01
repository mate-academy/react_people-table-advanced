import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <div className="Header">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <NavLink
              to="/"
              className="navbar-item"
            >
              Home
            </NavLink>
            <NavLink
              to="/people"
              className="navbar-item"
            >
              People Page
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};
