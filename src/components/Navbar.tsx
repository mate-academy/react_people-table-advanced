import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';

const Navbar: React.FC = () => (
  <div className="container">
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink
          className={({ isActive }) =>
            classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })
          }
          to="/people"
        >
          People
        </NavLink>
      </div>
    </nav>
  </div>
);

export default Navbar;
