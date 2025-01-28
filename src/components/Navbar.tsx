import { Link, useLocation, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const [SearchParams] = useSearchParams();

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
            className={`navbar-item ${location.pathname === '/' ? 'has-background-grey-lighter' : ''}`}
            to={{
              pathname: `/`,
              search: SearchParams.toString(),
            }}
          >
            Home
          </Link>

          <Link
            className={`navbar-item ${location.pathname === '/people' || location.pathname.startsWith('/people/') ? 'has-background-grey-lighter' : ''}`}
            to={{
              pathname: `/people`,
              search: SearchParams.toString(),
            }}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
