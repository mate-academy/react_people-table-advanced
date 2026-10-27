import { Link, useLocation, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isHomePage = location.pathname === '/';

  const isPeoplePage =
    location.pathname === '/people' || location.pathname.startsWith('/people/');

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
            className={`navbar-item ${
              isHomePage ? 'has-background-grey-lighter' : ''
            }`}
            aria-current={isHomePage ? 'page' : undefined}
          >
            Home
          </Link>

          <Link
            to={{
              pathname: '/people',
              search: isPeoplePage ? searchParams.toString() : '',
            }}
            className={`navbar-item ${
              isPeoplePage ? 'has-background-grey-lighter' : ''
            }`}
            aria-current={isPeoplePage ? 'page' : undefined}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
