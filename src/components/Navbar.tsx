import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const isPeoplePage =
    location.pathname === '/people' || location.pathname.startsWith('/people/');

  const peopleLink = isPeoplePage
    ? { pathname: '/people', search: location.search }
    : '/people';

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getNavLinkClass} to="/">
            Home
          </NavLink>

          <NavLink className={getNavLinkClass} to={peopleLink}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
