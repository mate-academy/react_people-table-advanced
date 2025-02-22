import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });
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
          <div className="navbar-brand">
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>

            <NavLink
              to={{ pathname: 'people', search: location.search }}
              className={getLinkClass}
            >
              People
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
