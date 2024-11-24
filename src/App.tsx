import { NavLink, Outlet } from 'react-router-dom';

import classNames from 'classnames';
import './App.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', {
    'has-background-grey-lighter is-active': isActive,
  });
};

const getLinkStyle = ({ isActive }: { isActive: boolean }) => {
  return { color: isActive ? 'blue' : 'inherit' };
};

export const App = () => {
  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar has-shadow" //is-fixed-top
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink to="/" end className={getLinkClass} style={getLinkStyle}>
              Home
            </NavLink>

            <NavLink to="/people" className={getLinkClass} style={getLinkStyle}>
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
