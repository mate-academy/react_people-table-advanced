import { NavLink, useLocation } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const Navbar = () => {
  const { pathname } = useLocation();

  const isPeoplePage = pathname.startsWith('/people');

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`.trim()
            }
          >
            Home
          </NavLink>

          <SearchLink
            to="/people"
            params={{}}
            className={`navbar-item ${isPeoplePage ? 'has-background-grey-lighter' : ''}`.trim()}
          >
            People
          </SearchLink>
        </div>
      </div>
    </nav>
  );
};
