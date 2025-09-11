import { SearchLink } from './SearchLink';
import { useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <nav
      className="navbar is-light is-fixed-top is-mobile has-shadow"
      data-cy="nav"
    >
      <div className="container">
        <div className="navbar-brand">
          <SearchLink
            to="/"
            className={`navbar-item ${isActive('/') ? 'has-background-grey-lighter' : ''}`}
          >
            Home
          </SearchLink>
          <SearchLink
            to="/people"
            className={`navbar-item ${isActive('/people') ? 'has-background-grey-lighter' : ''}`}
          >
            People
          </SearchLink>
        </div>
      </div>
    </nav>
  );
};
