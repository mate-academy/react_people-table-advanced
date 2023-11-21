import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  const getActive = (isActive:boolean) => `navbar-item ${isActive && 'has-background-grey-lighter'}`;

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={({ isActive }) => getActive(isActive)}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) => getActive(isActive)}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
