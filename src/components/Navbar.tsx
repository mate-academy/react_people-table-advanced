import { NavLink } from 'react-router-dom';
import { makeActive } from './Helpers';

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
          <NavLink className={makeActive} to="/">Home</NavLink>

          <NavLink
            aria-current="page"
            className={makeActive}
            to="people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
