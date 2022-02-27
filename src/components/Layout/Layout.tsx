import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import classNames from 'classnames';

export const Layout: React.FC = () => (
  <>
    <header>
      <nav className="navbar">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={({ isActive }) => classNames(
              'navbar-item is-tab', { 'is-active': isActive },
            )}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) => classNames(
              'navbar-item is-tab', { 'is-active': isActive },
            )}
          >
            People
          </NavLink>
        </div>
      </nav>
    </header>

    <main className="container is-max-desktop pl-3 pr-3 mt-5">
      <Outlet />
    </main>
  </>
);
