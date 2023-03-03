import React from 'react';
import { NavLinkPage } from './NavLinkPage';

export const NavBar: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLinkPage to="/" text="Home" />

        <NavLinkPage to="/people" text="People" />
      </div>
    </div>
  </nav>
);
