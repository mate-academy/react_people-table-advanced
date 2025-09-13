import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'has-background-grey-lighter navbar-item' : 'navbar-item'
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/people"
          className={({ isActive }) =>
            isActive ? 'has-background-grey-lighter navbar-item' : 'navbar-item'
          }
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);

export default Navbar;
