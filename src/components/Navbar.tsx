import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { eRoutes } from '../utils/eRoutes';

export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getLinkClass} to={eRoutes.HOME}>
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={getLinkClass}
            to={eRoutes.PEOPLE}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
