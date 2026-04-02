import { NavLink, useLocation } from 'react-router-dom';

const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
  return isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';
};

export const Navbar = () => {
  const { pathname, search } = useLocation();
  const peopleLink = pathname.startsWith('/people')
    ? { pathname: '/people', search }
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
          <NavLink to="/" end className={getLinkClassName}>
            Home
          </NavLink>

          <NavLink to={peopleLink} className={getLinkClassName}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
