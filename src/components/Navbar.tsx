import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  const peoplePath = location.pathname.startsWith('/people')
    ? { pathname: '/people', search: location.search }
    : '/people';

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

          <NavLink className={getLinkClass} to={peoplePath}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
