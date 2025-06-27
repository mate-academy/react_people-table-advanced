import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const isActiveLink = ({ isActive }: { isActive: boolean }) =>
    `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`;

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={isActiveLink} to="/">
            Home
          </NavLink>

          <NavLink aria-current="page" className={isActiveLink} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
