import { CustomNavLink } from './CustomNavLink';

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
          <CustomNavLink to="/">
            Home
          </CustomNavLink>

          <CustomNavLink to="/people">
            People
          </CustomNavLink>
        </div>
      </div>
    </nav>
  );
};
