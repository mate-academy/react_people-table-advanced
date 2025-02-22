import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { RoutesPathes } from '../helper/RoutesPathes';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

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
          <NavLink className={getLinkClass} to={RoutesPathes.HOME}>
            Home
          </NavLink>

          <NavLink className={getLinkClass} to={RoutesPathes.PEOPLE}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
