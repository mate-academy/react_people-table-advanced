import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getLinkClasses = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const NavMenu = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink className={getLinkClasses} to="/">
          Home
        </NavLink>

        <NavLink className={getLinkClasses} to="/people">
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
