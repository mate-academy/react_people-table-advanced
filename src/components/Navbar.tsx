import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

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
          <ul className="navbar-brand">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  classNames('navbar-item', {
                    'is-active': isActive,
                    'has-background-grey-lighter': isActive,
                  })
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/people"
                className={({ isActive }) =>
                  classNames('navbar-item', {
                    'is-active': isActive,
                    'has-background-grey-lighter': isActive,
                  })
                }
                aria-current="page"
              >
                People
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
