import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const location = useLocation();
  const isPeopleLocation = location.pathname.startsWith('/people');
  const isHomeLocation = location.pathname === '/';

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
              'has-background-grey-lighter': isHomeLocation,
            })}
          >
            Home
          </Link>

          <Link
            to={{ pathname: '/people', search: location.search }}
            className={cn('navbar-item', {
              'has-background-grey-lighter': isPeopleLocation,
            })}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
