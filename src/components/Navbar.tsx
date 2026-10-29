import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { pathname, search } = useLocation();
  const isPeoplePage =
    pathname === '/people' || pathname.startsWith('/people/');

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
            className={
              pathname === '/'
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
          >
            Home
          </Link>

          <Link
            to={{
              pathname: '/people',
              search,
            }}
            className={
              isPeoplePage
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
