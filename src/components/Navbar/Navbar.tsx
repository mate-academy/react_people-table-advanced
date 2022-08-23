import cn from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => {
  // const locationPathname: string = useLocation().pathname;

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
            className={({ isActive }) => cn({
              'navbar-item': true,
              'navbar-item is-tab': { 'is-active': isActive },
            })}
            to="/"
            end
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => cn({
              'navbar-item': true,
              'navbar-item is-tab': { 'is-active': isActive },
            })}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
