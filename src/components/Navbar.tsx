import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `navbar-item ${cn({ 'has-background-grey-lighter': isActive })}`;

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/people" className={linkClass} aria-current="page">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
