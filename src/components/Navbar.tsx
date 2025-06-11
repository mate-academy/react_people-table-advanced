import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const isActiveClass = ({ isActive }: { isActive: boolean }) => {
    return `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`;
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
          <NavLink to="/" className={isActiveClass}>
            Home Page
          </NavLink>

          <NavLink to="/people" className={isActiveClass}>
            People Page
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
