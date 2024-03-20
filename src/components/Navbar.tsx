import { NavLink } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';
};

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
          <NavLink className={getLinkClass} to="/">
            Home
          </NavLink>

          <NavLink aria-current="page" className={getLinkClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
