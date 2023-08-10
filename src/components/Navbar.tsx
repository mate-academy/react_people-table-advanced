import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const getBackgroundClass = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-item', {
    'has-background-grey-lighter': isActive,
  },
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
          <NavLink className={getBackgroundClass} to="/">
            Home
          </NavLink>

          <NavLink
            className={getBackgroundClass}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
