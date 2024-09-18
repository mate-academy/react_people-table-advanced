import { NavLink } from 'react-router-dom';
import { Path } from '../types';
import cn from 'classnames';

const getNavClasses = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getNavClasses} to={Path.main}>
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={getNavClasses}
            to={Path.people}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
