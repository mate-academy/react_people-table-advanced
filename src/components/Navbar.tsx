import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  // Дістаємо поточний рядок з параметрами (наприклад: "?sex=m&centuries=18")
  const { search } = useLocation();

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
              `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
            }
          >
            Home
          </NavLink>

          <NavLink
            // Передаємо збережені параметри в посилання
            to={{ pathname: '/people', search }}
            className={({ isActive }) =>
              `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
