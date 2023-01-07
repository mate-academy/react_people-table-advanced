import React from 'react';
import { NavBarItem } from './NavBarItem';

export const Navbar: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavBarItem to="/" title="Home" />
        <NavBarItem to="/people" title="People" />
      </div>
    </div>
  </nav>
);
