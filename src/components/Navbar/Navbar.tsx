import React from 'react';
import { useLocation } from 'react-router-dom';
import { PageNavLink } from '../PageNavLink';

export const Navbar: React.FC = React.memo(() => {
  const location = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <PageNavLink to="/" navTitle="Home" />
          <PageNavLink
            to={{
              pathname: '/people',
              search: location.search,
            }}
            navTitle="People"
          />
        </div>
      </div>
    </nav>
  );
});
