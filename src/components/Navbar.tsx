import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand"></div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/people"
          className={({ isActive, isPending }) =>
            `navbar-item ${isActive || isPending ? 'has-background-grey-lighter' : ''}`
          }
        >
          People
        </NavLink>
      </div>
    </nav>
  );
};
