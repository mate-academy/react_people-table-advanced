import { NavlinkPage } from './NavlinkPage';

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
          <NavlinkPage
            to="/"
            title="Home"
          />

          <NavlinkPage
            to="/people"
            title="People"
          />
        </div>
      </div>
    </nav>
  );
};
