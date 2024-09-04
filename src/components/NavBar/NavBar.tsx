import { NavLink } from 'react-router-dom';
import { styledActive } from '../../utils/styledActiveLink';
import { RoutesLink } from '../../types/Routes';

export const NavBar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={styledActive} to={RoutesLink.MainPage}>
            Home
          </NavLink>

          <NavLink className={styledActive} to={RoutesLink.PeoplePage}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
