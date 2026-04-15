import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const getClass = ({ isActive }: { isActive: boolean }) =>
    `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`;

  return (
    <nav data-cy="nav" className="navbar is-fixed-top has-shadow">
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getClass}>
            Home
          </NavLink>

          <NavLink to="/people" className={getClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
