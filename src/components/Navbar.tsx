import { NavLink } from 'react-router-dom';
import { getActive } from '../Const/isActive';

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
          <NavLink className={getActive} to="/">
            Home
          </NavLink>

          <NavLink aria-current="page" className={getActive} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
