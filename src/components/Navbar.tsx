import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const isActiveNavbar = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={isActiveNavbar} to="/">
            Home
          </NavLink>

          <NavLink aria-current="page" className={isActiveNavbar} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
