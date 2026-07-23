import './App.scss';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import cn from 'classnames';

const getTabClassname = ({ isActive }: { isActive: boolean }) => {
  return cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

export const App = () => {
  const { search } = useLocation();

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink className={getTabClassname} to="/">
              Home
            </NavLink>

            <NavLink
              className={getTabClassname}
              to={{ pathname: '/people', search }}
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
