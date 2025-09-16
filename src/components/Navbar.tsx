import classNames from 'classnames';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { SearchParamsContext } from '../store/searchHelper';

export const Navbar = () => {
  const { searchParams } = useContext(SearchParamsContext);

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
            className={({ isActive }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={({ isActive }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
            to={{
              pathname: '/people',
              search: searchParams.toString(),
            }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
