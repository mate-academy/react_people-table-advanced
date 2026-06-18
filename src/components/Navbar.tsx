import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

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
            className={classNames('navbar-item', {
              'has-background-grey-lighter': location.pathname === '/',
            })}
            to={{
              pathname: '/',
              search: location.search,
            }}
          >
            Home
          </Link>

          <Link
            className={classNames('navbar-item', {
              'has-background-grey-lighter':
                location.pathname.startsWith('/people'),
            })}
            to={{
              pathname: '/people',
              search: location.search,
            }}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
