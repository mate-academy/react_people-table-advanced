import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

const getClass = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', isActive && 'has-background-grey-lighter');

export const Navbar = () => {
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
          <NavLink className={getClass} to={{ pathname: '/', search: search }}>
            Home
          </NavLink>

          <NavLink
            className={getClass}
            to={{ pathname: '/people', search: search }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
