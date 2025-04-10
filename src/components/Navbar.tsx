import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

const getActiveClass = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

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
          <NavLink className={getActiveClass} to="/">
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={getActiveClass}
            to={`/people${search}`}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
