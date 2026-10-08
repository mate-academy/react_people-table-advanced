import { Link, useLocation } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const Navbar = () => {
  const { pathname } = useLocation();

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
            className={`navbar-item ${pathname === '/' ? 'has-background-grey-lighter' : ''}`}
            to="/"
          >
            Home
          </Link>

          <SearchLink
            aria-current="page"
            className={`navbar-item ${pathname.startsWith('/people') ? 'has-background-grey-lighter' : ''}`}
            to="/people"
            params={{}}
          >
            People
          </SearchLink>
        </div>
      </div>
    </nav>
  );
};
