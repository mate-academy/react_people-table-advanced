import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >

      <div className="container">
        <div className="navbar-brand">
          <NavLink className="navbar-item" to="/">Home</NavLink>

          <NavLink
            aria-current="page"
            className="navbar-item has-background-grey-lighter"
            to={`/people${location.search.toString()}`}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
