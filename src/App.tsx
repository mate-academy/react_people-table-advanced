import './App.scss';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import classNames from 'classnames';

function getClassLink({ isActive }: { isActive: boolean }) {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
}

export const App = () => {
  const { search } = useLocation();

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
            <NavLink className={getClassLink} to="/">
              Home
            </NavLink>

            <NavLink
              className={getClassLink}
              to={{
                pathname: '../people',
                search,
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
