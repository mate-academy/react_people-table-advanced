import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
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
            className={classNames('navbar-item', {
              'has-background-grey-lighter': pathname === '/',
            })}
            to="/"
          >
            Home
          </Link>

          <Link
            className={classNames('navbar-item', {
              'has-background-grey-lighter': pathname.startsWith('/people'),
            })}
            to={`/people${pathname.slice(7)}${search}`}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
