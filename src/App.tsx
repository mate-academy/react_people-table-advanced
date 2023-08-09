import cn from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';
import './App.scss';

export const App = () => {
  const isActiveNav = ({ isActive }: { isActive: boolean }) => cn(
    'navbar-item', {
      'has-background-grey-lighter': isActive,
    },
  );

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
              to="/"
              className={isActiveNav}
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={isActiveNav}
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
