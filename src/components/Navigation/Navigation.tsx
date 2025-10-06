import classNames from 'classnames';
import * as React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.toString();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={({ isActive }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
          >
            Home
          </NavLink>

          <NavLink
            to={{
              pathname: '/people',
              search: search ? `?${search}` : '',
            }}
            className={({ isActive }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
