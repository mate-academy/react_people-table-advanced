import { Link, useLocation } from 'react-router-dom';
import { isActive } from '../utils/isActive';

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
            className={`navbar-item ${isActive(location.pathname, '/') ? 'has-background-grey-lighter' : ''}`}
            to="/"
          >
            Home
          </Link>

          <Link
            className={`navbar-item ${isActive(location.pathname, '/people') ? 'has-background-grey-lighter' : ''}`}
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
