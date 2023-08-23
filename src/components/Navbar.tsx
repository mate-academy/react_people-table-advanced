import React from 'react';
import { NavLink } from 'react-router-dom';
import { getLinkClass } from '../utils/getLinkClass';

export const Navbar: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink className={getLinkClass} to="/">Home</NavLink>
        <NavLink className={getLinkClass} to="/people">People</NavLink>
      </div>
    </div>
  </nav>
);
