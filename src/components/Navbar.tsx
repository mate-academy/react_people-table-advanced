import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export const Navbar = () => {
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
          <Link
            className={`navbar-item ${location.pathname === '/' ? 'has-background-grey-lighter' : ''}`}
            to={{ pathname: '/', search: '' }}
          >
            Home
          </Link>

          <Link
            aria-current="page"
            className={`navbar-item ${location.pathname.startsWith('/people') ? 'has-background-grey-lighter' : ''}`}
            to={{ pathname: '/people', search: location.search }}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
