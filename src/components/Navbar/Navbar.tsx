import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const isLinkActive = ({ isActive }: { isActive: boolean }): string => {
    return cn('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  };

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
            className={isLinkActive}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={isLinkActive}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
