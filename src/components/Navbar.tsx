import React from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

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
          <Link className={getLinkClass({ isActive: pathname === '/' })} to="/">
            Home
          </Link>

          <Link
            className={getLinkClass({
              isActive: pathname.startsWith('/people'),
            })}
            to={{ pathname: '/people', search: search }}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
