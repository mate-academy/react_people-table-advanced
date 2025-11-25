import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navbar = () => {
  const location = useLocation();

  const peopleSearch = location.pathname.startsWith('/people')
    ? location.search
    : '';

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
            to={{
              pathname: '/people',
              search: peopleSearch,
            }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
