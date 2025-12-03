import './App.scss';
import { NavLink, Outlet, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

export const App = () => {
  const [searchParams] = useSearchParams();

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
                cn('navbar-item', { 'has-background-grey-lighter': isActive })
              }
              to={{
                pathname: '/',
                search: searchParams.toString(),
              }}
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                cn('navbar-item', { 'has-background-grey-lighter': isActive })
              }
              to={{
                pathname: '/people',
                search: searchParams.toString(),
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
