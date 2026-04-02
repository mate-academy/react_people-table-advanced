import { NavLink, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const [searchParams] = useSearchParams();

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
          >
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={({ isActive }) =>
              `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
            }
            to={{
              pathname: '/people',
              search: searchParams.toString()
                ? `${searchParams.toString()}`
                : '',
            }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
