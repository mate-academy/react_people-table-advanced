import { NavLink, Outlet } from 'react-router-dom';
import './App.scss';

const toggleClass = (isActive: boolean) => {
  return `navbar-item ${isActive && 'has-background-grey-lighter'}`;
};

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
          <NavLink className={({ isActive }) => toggleClass(isActive)} to="/">
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => toggleClass(isActive)}
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
