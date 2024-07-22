import { NavLink } from 'react-router-dom';
import { getNavbarItemClassName } from '../utils/helpers';

export const Navbar: React.FC = () => {
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
            to={'/'}
            className={({ isActive }) => getNavbarItemClassName(isActive)}
          >
            Home
          </NavLink>

          <NavLink
            to={'/people'}
            className={({ isActive }) => getNavbarItemClassName(isActive)}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
