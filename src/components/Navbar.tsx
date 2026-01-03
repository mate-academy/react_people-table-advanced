import classNames from 'classnames';
import {
  NavLink,
  Outlet,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

export const NavBar = () => {
  const [searchParams] = useSearchParams();
  const { state } = useLocation();

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink
              className={({ isActive }) =>
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
              to="/"
              state={{ search: searchParams.toString() }}
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
              to={{
                pathname: 'people',
                search: state?.search || searchParams.toString(),
              }}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>
      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
