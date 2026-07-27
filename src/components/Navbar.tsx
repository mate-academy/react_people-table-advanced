import { Link, useLocation, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
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
          <Link
            to="/"
            className={`navbar-item ${location.pathname === '/' ? 'has-background-grey-lighter' : ''}`}
          >
            Home
          </Link>

          <Link
            to={{
              pathname: '/people',
              search: searchParams.toString(),
            }}
            className={`navbar-item ${location.pathname.startsWith('/people') ? 'has-background-grey-lighter' : ''}`}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
