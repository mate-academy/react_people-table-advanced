import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const isPeopleRoute = location.pathname.startsWith('/people');

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
            end
            className={({ isActive }) =>
              'navbar-item' + (isActive ? ' has-background-grey-lighter' : '')
            }
          >
            Home
          </NavLink>

          <NavLink
            to={
              isPeopleRoute
                ? { pathname: '/people', search: location.search }
                : '/people'
            }
            className={({ isActive }) =>
              'navbar-item' + (isActive ? ' has-background-grey-lighter' : '')
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
