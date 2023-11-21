import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const activePage = ({ isActive }: { isActive: boolean }) => {
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

          <NavLink to="/" className={activePage}>Home</NavLink>

          <NavLink to="/people" className={activePage}>People</NavLink>
        </div>
      </div>
    </nav>
  );
};
