import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { RoutesName } from '../types/RoutesName';

export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return cn('navbar-item', { 'has-background-grey-lighter': isActive });
  };

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getLinkClass} to={RoutesName.home}>
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={getLinkClass}
            to={RoutesName.people}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
