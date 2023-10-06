import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

function MainNavigation() {
  return (
    <>
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink
              className={({ isActive }) => classNames(
                'navbar-item', { 'has-background-grey-lighter': isActive },
              )}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => classNames(
                'navbar-item', { 'has-background-grey-lighter': isActive },
              )}
              to="/people"
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default MainNavigation;
