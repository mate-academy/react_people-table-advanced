import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

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
          <NavLink
            className={({ isActive }) => {
              return classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              });
            }}
            to="/"
            end
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
            to={peopleLink}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
