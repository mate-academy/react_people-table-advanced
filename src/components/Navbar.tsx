import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
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
            to={{
              pathname: '/',
              search: location.search,
            }}
            className={`navbar-item ${location.pathname === '/' ? 'is-active has-background-grey-lighter' : ''}`}
          >
            Home
          </Link>

          <Link
            to={{
              pathname: '/people',
              search: location.search,
            }}
            className={`navbar-item ${location.pathname.startsWith('/people') ? 'is-active has-background-grey-lighter' : ''}`}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
