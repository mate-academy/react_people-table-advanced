import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { RoutesItems } from '../types/Router';

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
            className={({ isActive }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={({ isActive }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
            to={RoutesItems.People}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
