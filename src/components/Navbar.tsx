import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
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
            to="/"
            className={cn('navbar-item', {
              'has-background-grey-lighter': location.pathname === '/',
            })}
          >
            Home
          </Link>

          <Link
            to="/people"
            className={cn('navbar-item', {
              'has-background-grey-lighter':
                location.pathname.startsWith('/people'),
            })}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
