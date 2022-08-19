import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import { applyClassNames } from '../../utils/applyClassNames';

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar has-shadow default__navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            className={({ isActive }) => (
              applyClassNames(
                isActive,
                'has-background-grey-lighter',
                'navbar-item',
              )
            )}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => (
              applyClassNames(
                isActive,
                'has-background-grey-lighter',
                'navbar-item',
              )
            )}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
