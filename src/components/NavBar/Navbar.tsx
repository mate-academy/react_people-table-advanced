import { NavBarLink } from '../NavBarLink';

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
          <NavBarLink to="/">
            Home
          </NavBarLink>

          <NavBarLink to="/people">
            People
          </NavBarLink>
        </div>
      </div>
    </nav>
  );
};
