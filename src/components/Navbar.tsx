import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

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
            to={{
              pathname: '/',
              search: searchParams.toString(),
            }}
            className={`navbar-item ${pathname === '/' ? 'has-background-grey-lighter' : ''}`}
          >
            Home
          </Link>

          <Link
            to={{
              pathname: '/people',
              search: searchParams.toString(),
            }}
            className={`navbar-item ${
              pathname.startsWith('/people')
                ? 'has-background-grey-lighter'
                : ''
            }`}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
