import { NavLink, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar = () => {
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
            to={{ pathname: '/people', search: searchParams.toString() }}
            className={({ isActive }) => isActive
              ? 'navbar-item has-background-grey-lighter'
              : 'navbar-item'}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
