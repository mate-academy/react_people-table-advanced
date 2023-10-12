import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const getClassesLink = ({ isActive }: { isActive: boolean }) => (
  classNames('navbar-item', { 'has-background-grey-lighter': isActive })
);

export const NavBar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          className={getClassesLink}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={getClassesLink}
          to="people"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
