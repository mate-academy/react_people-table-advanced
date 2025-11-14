import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const activeClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';
  const { pathname, search } = useLocation();
  const peopleLink = pathname.startsWith('/people')
    ? `/people${search}`
    : '/people';

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={activeClass} to="/">
            Home
          </NavLink>

          <NavLink className={activeClass} to={peopleLink}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
