import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getActiveLink = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-item', { 'has-background-grey-lighter': isActive },
);

export const NavBar = () => {
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
            className={getActiveLink}
            replace
          >
            Home
          </NavLink>
          <NavLink
            to="/people"
            className={getActiveLink}
            replace
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
