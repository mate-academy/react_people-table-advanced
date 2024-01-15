import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const isNavbarChoosen = ({ isActive }: { isActive: boolean }) => (
    isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item');

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={isNavbarChoosen}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={isNavbarChoosen}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
