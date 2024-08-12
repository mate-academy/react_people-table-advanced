import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getActiveLink = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

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
          <NavLink to="/" className={getActiveLink}>
            Home
          </NavLink>

          <NavLink className={getActiveLink} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
