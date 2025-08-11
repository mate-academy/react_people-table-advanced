import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import classNames from 'classnames';

export const Navbar = () => {
  const getLinkActive = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to={ROUTES.HOME} className={getLinkActive}>
            Home
          </NavLink>

          <NavLink
            to={ROUTES.PEOPLE}
            aria-current="page"
            className={getLinkActive}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
