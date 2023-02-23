import React from 'react';
import { NavbarLink } from './NavbarLink';

export const Navbar: React.FC = React.memo(() => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavbarLink to="/">
          Home
        </NavbarLink>

        <NavbarLink to="/people" preserveParams>
          People
        </NavbarLink>
      </div>
    </div>
  </nav>
));
