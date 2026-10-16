import { Link, useLocation } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const Navbar = () => {
  const { pathname } = useLocation();

  const isHomePage = pathname === '/';
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
            className={`navbar-item ${
              isHomePage ? 'has-background-grey-lighter' : ''
            }`}
          >
            Home
          </Link>

          <SearchLink
            to="/people"
            className={`navbar-item ${
              isPeoplePage ? 'has-background-grey-lighter' : ''
            }`}
          >
            People
          </SearchLink>
        </div>
      </div>
    </nav>
  );
};
