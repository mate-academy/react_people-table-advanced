import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { pathname, search } = useLocation();

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
            className={`navbar-item ${pathname === '/' ? 'has-background-grey-lighter' : ''}`}
          >
            Home
          </Link>
          <Link
            className={`navbar-item ${pathname.startsWith('/people') ? 'has-background-grey-lighter' : ''}`}
            to={{ pathname: '/people', search }}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
