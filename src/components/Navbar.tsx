import { NavLink, useLocation } from 'react-router-dom';
import cl from 'classnames';

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
          <NavLink
            to="/"
            className={({ isActive }) =>
              cl('navbar-item', { 'has-background-grey-lighter': isActive })
            }
            end
          >
            Home
          </NavLink>

          <NavLink
            to={{
              pathname: `/people`,
              search: location.search,
            }}
            className={({ isActive }) =>
              cl('navbar-item', { 'has-background-grey-lighter': isActive })
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
