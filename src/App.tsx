import classNames from 'classnames';
import './App.scss';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const handleActive = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
};

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
          <div className="navbar-brand">
            <NavLink className={handleActive} to="/">
              Home
            </NavLink>

            <NavLink
              className={handleActive}
              to={{ pathname: '/people', search: location.search }}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};
