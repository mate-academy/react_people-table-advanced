import { NavLink, useLocation } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';

export const Navbar = () => {
  const location = useLocation();

  const getPeopleLink = () => {
    const params = new URLSearchParams(location.search);

    return `/people${params.toString() ? `?${params.toString()}` : ''}`;
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

          <NavLink className={getLinkClass} to={getPeopleLink()}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
