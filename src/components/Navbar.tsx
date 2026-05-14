import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const peopleLink =
    location.pathname === '/people' ? `/people${location.search}` : '/people';

  const linkClass = (isActive: boolean) =>
    `navbar-item${isActive ? ' has-background-grey-lighter' : ''}`;

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink end to="/" className={({ isActive }) => linkClass(isActive)}>
            Home
          </NavLink>

          <NavLink
            to={peopleLink}
            className={({ isActive }) => linkClass(isActive)}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
