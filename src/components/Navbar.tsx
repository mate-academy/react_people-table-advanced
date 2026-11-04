import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const { pathname, search } = useLocation();
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
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>
          <NavLink
            to={{
              pathname: '/people',
              search: pathname.startsWith('/people') ? search : '',
            }}
            className={getLinkClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
