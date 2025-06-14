import { useLocation } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const Navbar = () => {
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isPeople = location.pathname.startsWith('/people');

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <SearchLink
            params={{}}
            to="/"
            className={`navbar-item ${isHome ? 'has-background-grey-lighter' : ''}`}
          >
            Home
          </SearchLink>

          <SearchLink
            params={{}}
            to="/people"
            className={`navbar-item ${isPeople ? 'has-background-grey-lighter' : ''}`}
          >
            People
          </SearchLink>
        </div>
      </div>
    </nav>
  );
};
