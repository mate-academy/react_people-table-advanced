import { NavLink, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

const getActiveClass = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', { 'has-background-grey-lighter': isActive });

export const NavBar = () => {
  const [searchParams] = useSearchParams();

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
            className={getActiveClass}
            to={`people?${searchParams.toString()}`}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
