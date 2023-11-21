import cn from 'classnames';
import { NavLink } from 'react-router-dom';

const setClasses = ({ isActive }: { isActive: boolean }) => cn('navbar-item', {
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
          <NavLink className={setClasses} to="/">Home</NavLink>

          <NavLink
            aria-current="page"
            className={setClasses}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
