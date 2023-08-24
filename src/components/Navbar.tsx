import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getClassNames = ({ isActive = false }) => classNames(
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
            to="/"
            className={getClassNames}
          >
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            to="/people"
            className={getClassNames}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
