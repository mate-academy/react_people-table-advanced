import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getLinkNavClass = ({ isActive }: { isActive: boolean }) => (
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  }));

export const NavBar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink className={getLinkNavClass} to="/">
          Home
        </NavLink>

        <NavLink
          className={getLinkNavClass}
          to="/people"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
