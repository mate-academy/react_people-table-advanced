import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? 'navbar-item is-active has-background-grey-lighter'
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
