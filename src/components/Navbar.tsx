import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getLinkActive = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink className={getLinkActive} to="/">
          Home
        </NavLink>

        <NavLink className={getLinkActive} to="people">
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
