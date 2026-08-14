import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isPeoplePage =
    location.pathname === '/people' || location.pathname.startsWith('/people/');

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
              `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
            }
            to="/"
            end
          >
            Home
          </NavLink>

          <NavLink
            className={`navbar-item ${
              isPeoplePage ? 'has-background-grey-lighter' : ''
            }`}
            to={{
              pathname: '/people',
              search: searchParams.toString(),
            }}
            end
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
