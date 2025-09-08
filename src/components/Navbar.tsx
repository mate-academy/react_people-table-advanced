import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

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
            className={classNames('navbar-item', {
              'has-background-grey-lighter': location.pathname === '/',
            })}
          >
            Home
          </Link>

          <Link
            to={{
              pathname: '/people',
              search: location.pathname.startsWith('/people')
                ? location.search
                : '',
            }}
            className={classNames('navbar-item', {
              'has-background-grey-lighter':
                location.pathname.startsWith('/people'),
            })}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
