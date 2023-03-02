import React from 'react';
import { PageLink } from '../PageLink';

export const NavBar: React.FC = React.memo(() => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageLink to="/" text="Home" />
        <PageLink to="/people" text="People" />
      </div>
    </div>
  </nav>
));
