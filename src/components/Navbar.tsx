import { NavLink, useLocation } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const Navbar = () => {
  const { pathname } = useLocation();
  const isPeopleActive = pathname.startsWith('/people');

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
            className={({ isActive }) =>
              isActive
                ? `navbar-item has-background-grey-lighter`
                : `navbar-item`
            }
            to="/"
          >
            Home
          </NavLink>

          <SearchLink
            className={`navbar-item ${
              isPeopleActive ? 'has-background-grey-lighter' : ''
            }`}
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
