import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar: React.FC = () => {
  const [searchParams] = useSearchParams();

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>

          <NavLink
            to={{
              pathname: '/people',
              search: searchParams.toString(),
            }}
            className={getNavLinkClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
