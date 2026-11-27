import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const Navbar = () => {
  const location = useLocation();
  const peopleLink = {
    pathname: '/people',
    search: location.pathname.startsWith('/people') ? location.search : '',
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
          <NavLink className={getLinkClass} to="/" end>
            Home
          </NavLink>

          <NavLink className={getLinkClass} to={peopleLink}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
