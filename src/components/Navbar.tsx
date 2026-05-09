import { Link, NavLink, useMatch, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const [searchParams] = useSearchParams();
  const isPeoplePage = useMatch('/people/*');

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
              cn('navbar-item', { 'has-background-grey-lighter': isActive })
            }
            to="/"
            end
          >
            Home
          </NavLink>

          <Link
            className={cn('navbar-item', {
              'has-background-grey-lighter': !!isPeoplePage,
            })}
            to={{ pathname: '/people', search: searchParams.toString() }}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
