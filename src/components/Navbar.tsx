import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar = () => {
  const location = useLocation();
  const peopleTo = location.pathname.startsWith('/people')
    ? `/people${location.search}`
    : '/people';

  return (
    <nav className="navbar mb-4">
      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
          >
            Home
          </NavLink>

          <NavLink
            to={peopleTo}
            className={({ isActive }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
