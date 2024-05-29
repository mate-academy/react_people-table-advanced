import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { ROUTES } from '../../utils/routes';

export const Navbar = () => {
  const isLinkActive = ({ isActive }: { isActive: boolean }) => {
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
          <NavLink className={isLinkActive} to={ROUTES.HOME}>
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={isLinkActive}
            to={ROUTES.PEOPLE}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
