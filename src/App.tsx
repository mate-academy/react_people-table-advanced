import classNames from 'classnames';
import './App.scss';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const navLinkClassNames = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
};

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
            <NavLink className={navLinkClassNames} to="/">
              Home
            </NavLink>

            <NavLink
              className={navLinkClassNames}
              to={{ pathname: 'people', search }}
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
