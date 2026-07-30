import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const peopleSearch = location.pathname.startsWith('/people')
    ? location.search
    : '';

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
              ['navbar-item', isActive ? 'has-background-grey-lighter' : '']
                .filter(Boolean)
                .join(' ')
            }
          >
            Home
          </NavLink>

          <NavLink
            to={{
              pathname: '/people',
              search: peopleSearch,
            }}
            className={({ isActive }) =>
              ['navbar-item', isActive ? 'has-background-grey-lighter' : '']
                .filter(Boolean)
                .join(' ')
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
