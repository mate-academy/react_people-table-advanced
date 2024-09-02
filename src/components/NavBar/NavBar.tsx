import { NavLink } from 'react-router-dom';
const styledActive = ({ isActive }: { isActive: boolean }) => {
  return ['navbar-item', isActive ? 'has-background-grey-lighter' : ''].join(
    ' ',
  );
};

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
          <NavLink className={styledActive} to="/">
            Home
          </NavLink>

          <NavLink className={styledActive} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
