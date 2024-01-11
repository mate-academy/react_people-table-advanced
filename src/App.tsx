import { NavLink, Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import classNames from 'classnames';

const getActiveLinkClass
  = ({ isActive }: { isActive: boolean }) => classNames('navbar-item ', {
    'has-background-grey-lighter': isActive,
  });

export const App = () => {
  const location = useLocation();

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand ">
            <NavLink className={getActiveLinkClass} to="/">
              Home
            </NavLink>

            <NavLink
              className={getActiveLinkClass}
              to={{
                pathname: 'people',
                search: location.search,
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
