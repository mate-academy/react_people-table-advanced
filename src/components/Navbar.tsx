import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getClassForLink = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
    'is-active': isActive,
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
          <NavLink className={getClassForLink} to="/">
            Home
          </NavLink>

          <NavLink className={getClassForLink} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
