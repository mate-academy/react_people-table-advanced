import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const getLinkClass = (
  { isActive }: { isActive: boolean },
) => cn('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            className={getLinkClass}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={getLinkClass}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
