import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const getActiveLink = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

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
          <NavLink to="/" end className={getActiveLink}>
            Home
          </NavLink>

          <NavLink to="/people" className={getActiveLink}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
