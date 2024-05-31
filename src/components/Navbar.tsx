import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Routes as AppRoutes } from '../utils/routes';

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
        <div className={'navbar-brand'}>
          <NavLink className={getLinkClass} to={AppRoutes.ROOT}>
            Home
          </NavLink>

          <NavLink className={getLinkClass} to={AppRoutes.PEOPLE}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
