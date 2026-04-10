import { Link, useLocation } from 'react-router-dom';

const ACTIVE_NAV_CLASS = 'has-background-grey-lighter';

export const Navbar = () => {
  const location = useLocation();
  const { pathname, search } = location;
  const isHome = pathname === '/';
  const isPeople = pathname === '/people' || pathname.startsWith('/people/');

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
            className={`navbar-item ${isHome ? ACTIVE_NAV_CLASS : ''}`}
            to="/"
          >
            Home
          </Link>

          <Link
            className={`navbar-item ${isPeople ? ACTIVE_NAV_CLASS : ''}`}
            to={{ pathname: '/people', search }}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
