import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { navLinks } from '../../constants/navLinks';

export const Nav = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        {navLinks.map(({ path, title, id }) => (
          <NavLink
            key={id}
            to={path}
            aria-current="page"
            className={({ isActive }) =>
              cn('navbar-item', { 'has-background-grey-lighter': isActive })
            }
          >
            {title}
          </NavLink>
        ))}
      </div>
    </div>
  </nav>
);
