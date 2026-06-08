import { Link, useLocation } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const Navbar = () => {
  const location = useLocation();

  const isHomeActive = location.pathname === '/';
  const isPeopleActive = location.pathname.startsWith('/people');

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
            className={`navbar-item ${isHomeActive ? 'has-background-grey-lighter is-active' : ''}`}
            to="/"
          >
            Home
          </Link>

          {isPeopleActive ? (
            <SearchLink
              aria-current="page"
              className="navbar-item has-background-grey-lighter is-active"
              params={{}}
            >
              People
            </SearchLink>
          ) : (
            <Link className="navbar-item" to="/people">
              People
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
