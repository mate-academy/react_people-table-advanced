import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  const handleNavActive = ({ isActive }: { isActive: boolean }) => classNames(
    'navbar-item', { 'has-background-grey-lighter': isActive },
  );

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
            className={handleNavActive}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={handleNavActive}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
