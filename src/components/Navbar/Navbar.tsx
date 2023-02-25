import React from 'react';

import { PageNavLink } from '../PageNavLink';

export const Navbar: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <PageNavLink
            to="/"
            linkText="Home"
          />

          <PageNavLink
            to="/people"
            linkText="People"
            saveParams
          />
        </div>
      </div>
    </nav>
  );
};
