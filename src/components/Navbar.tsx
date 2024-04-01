import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

function configureLinkClassNames({ isActive }: { isActive: boolean }) {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
}

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
          <NavLink className={configureLinkClassNames} to="/">
            Home
          </NavLink>

          <NavLink className={configureLinkClassNames} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
