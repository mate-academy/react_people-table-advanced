import { NavLink, Outlet } from 'react-router-dom';
import './App.scss';
import classNames from 'classnames';

const linkClassNames = (
  { isActive } : { isActive : boolean },
) => classNames('navbar-item', {
  'has-background-grey-lighter': isActive,
});

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={linkClassNames} to="/">
            Home
          </NavLink>

          <NavLink
            className={linkClassNames}
            to="/people"
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
