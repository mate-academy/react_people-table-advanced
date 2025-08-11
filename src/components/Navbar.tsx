import classNames from 'classnames';

import { NavLink } from 'react-router-dom';
import { ROUTES } from '../utils/ways';

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
          <NavLink className={getLinkClass} to={ROUTES.HOME}>
            Home
          </NavLink>

          <NavLink className={getLinkClass} to={ROUTES.PEOPLE}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
