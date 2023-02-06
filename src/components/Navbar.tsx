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
            to="/"
            className={({ isActive }) => (
              classNames(
                'navbar-item',
                { 'has-background-grey-lighter': isActive },
              )
            )}
          >
            Home
          </NavLink>

          <NavLink
            to={{
              pathname: '/people',
              search: searchParams.toString(),
            }}
            aria-current="page"
            className={({ isActive }) => (
              classNames(
                'navbar-item',
                { 'has-background-grey-lighter': isActive },
              )
            )}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
