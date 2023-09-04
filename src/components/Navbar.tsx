import React from 'react';
import { PageLink } from './PageLink';

export const Navbar: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageLink to="/" title="Home" />
        <PageLink to="people" title="People" />
      </div>
    </div>
  </nav>
);
