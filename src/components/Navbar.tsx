import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const getNavLinkCLasses = (
    { isActive }: { isActive: boolean },
  ) => {
    return classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    );
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
            to="/"
            className={getNavLinkCLasses}
          >
            Home
          </NavLink>

          <NavLink
            to="people"
            className={getNavLinkCLasses}
            aria-current="page"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
