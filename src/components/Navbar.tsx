import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

export const Navbar = () => {
  const location = useLocation();
  const isHomeActive = location.pathname === '/';
  const isPeopleActive = location.pathname.startsWith('/people');

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
              'has-background-grey-lighter': isHomeActive,
            })}
            to="/"
          >
            Home
          </Link>

          <SearchLink
            aria-current="page"
            className={cn('navbar-item', {
              'has-background-grey-lighter': isPeopleActive,
            })}
            to="/people"
            params={{}}
          >
            People
          </SearchLink>
        </div>
      </div>
    </nav>
  );
};
