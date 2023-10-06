import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const linkClassName = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-item',
  { 'has-background-grey-lighter': isActive },
);

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
            className={linkClassName}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={linkClassName}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
