import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const location = useLocation();

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
            to={'/'}
            className={({ isActive }) =>
              cn('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
          >
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            to={{ pathname: '/people', search: location.search }}
            className={({ isActive }) =>
              cn('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
