import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const activeClass = ({ isActive }: { isActive: boolean }) =>
    `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`.trim();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={activeClass} end>
            Home
          </NavLink>

          <NavLink to="/people" className={activeClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
