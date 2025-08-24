import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getNavLinkClass} to="/">
            Home
          </NavLink>

          <NavLink
            className={getNavLinkClass}
            to={{ pathname: '/people', search: location.search }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
