import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) => (
  classNames('navbar-item', { 'has-background-grey-lighter': isActive })
);

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
          <NavLink to="/" end className={getNavLinkClassName}>
            Home
          </NavLink>

          <NavLink
            className={getNavLinkClassName}
            to={{ pathname: '/people', search: location.search }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
