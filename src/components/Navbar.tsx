import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const isNavLinkActive = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? 'navbar-item has-background-grey-lighter'
      : 'navbar-item';
  };

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={isNavLinkActive}>
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={isNavLinkActive}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
