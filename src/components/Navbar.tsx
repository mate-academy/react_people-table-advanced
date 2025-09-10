import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isOnPeople = location.pathname.startsWith('/people');

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
              'navbar-item' + (isActive ? ' has-background-grey-lighter' : '')
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              'navbar-item' + (isActive ? ' has-background-grey-lighter' : '')
            }
            to={{
              pathname: '/people',
              search: isOnPeople ? location.search : '',
            }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
