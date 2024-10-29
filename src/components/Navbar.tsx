import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const navlinkActiveClass = ({ isActive }: { isActive: boolean }) => {
  return cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

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
          <NavLink className={navlinkActiveClass} to="/">
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={navlinkActiveClass}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
