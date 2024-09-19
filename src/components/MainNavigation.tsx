import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { NAVIGATION_CONFIG } from '../utils/navigation.config';

export const MainNavigation = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        {NAVIGATION_CONFIG.map(({ key, title, path }) => (
          <NavLink
            key={key}
            className={({ isActive }) =>
              cn('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
            to={path}
          >
            {title}
          </NavLink>
        ))}
      </div>
    </div>
  </nav>
);
