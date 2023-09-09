import { NavLink, useLocation } from 'react-router-dom';

const haveActive = ({ isActive }: { isActive: boolean }) => {
  return isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';
};

export const Navbar = () => {
  const { search } = useLocation();

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
            className={haveActive}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={haveActive}
            to={`/people${search}`}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
