import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

export const NavBar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn('navbar-item', { 'has-background-grey-lighter': isActive });

  const { search } = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getLinkClass} to="/" end>
            Home
          </NavLink>

          <NavLink
            className={getLinkClass}
            to={{ pathname: '/people', search }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
