import cn from 'classnames';
import { NavLink } from 'react-router-dom';

function getNavLinkClasses({ isActive }: { isActive: boolean }) {
  return cn('navbar-item', { 'has-background-grey-lighter': isActive });
}

export const NavBar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink to="" className={getNavLinkClasses}>
          Home
        </NavLink>
        <NavLink to="people" className={getNavLinkClasses}>
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
