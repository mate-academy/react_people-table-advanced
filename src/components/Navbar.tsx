import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './Navbar.scss';

const activeClass = (
  { isActive }: { isActive: boolean },
) => cn('navbar-item', {
  'has-background-grey-lighter': isActive,
});

export const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container navbar-container">
      <div className="navbar-brand">
        <NavLink
          className={activeClass}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          aria-current="page"
          className={activeClass}
          to="/people"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
