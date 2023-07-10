import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar = () => {
  const navLinkClasses = (
    { isActive }: { isActive: boolean },
  ) => classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

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
            to="/"
            className={navLinkClasses}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={navLinkClasses}
            aria-current="page"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
