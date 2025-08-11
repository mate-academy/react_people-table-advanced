import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const Navbar = () => (
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
            classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/people"
          className={({ isActive }) =>
            classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })
          }
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);

export default Navbar;
