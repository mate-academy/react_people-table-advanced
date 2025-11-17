import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';

export const Navbar: React.FC = () => {
  const { pathname, search } = useLocation();

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
            className={cn('navbar-item', {
              'has-background-grey-lighter': pathname === '/',
            })}
            to="/"
          >
            Home
          </Link>

          <Link
            className={cn('navbar-item', {
              'has-background-grey-lighter': pathname.startsWith('/people'),
            })}
            to={{
              pathname: '/people',
              search: pathname.startsWith('/people') ? search : '',
            }}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
