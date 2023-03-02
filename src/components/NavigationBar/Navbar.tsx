import React from 'react';
import { PageNavigationLink } from '../PageNavigationLink';

export const NavigationBar: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavigationLink to="/" text="Home" />
        <PageNavigationLink to="people" text="People" />
      </div>
    </div>
  </nav>
);
