import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { search } = useLocation();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getLinkClass} to="/">
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
