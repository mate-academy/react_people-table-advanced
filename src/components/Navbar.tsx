import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar = () => {
  return (
    <nav aria-label="main navigation">
      <div className="container">
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
  );
};
