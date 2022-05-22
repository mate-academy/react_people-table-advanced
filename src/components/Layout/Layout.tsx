import React from 'react';
import classNames from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';

export const Layout: React.FC = () => (
  <>
    <nav className="navbar is-fixed-top is-light ml-4" role="navigation">
      <div className="navbar-brand">
        <NavLink
          className={({ isActive }) => classNames(
            'navbar-item is-tab has-text-weight-semibold is-size-5',
            { 'is-active': isActive },
          )}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => classNames(
            'navbar-item is-tab has-text-weight-semibold is-size-5',
            { 'is-active': isActive },
          )}
          to="/people"
        >
          People
        </NavLink>
      </div>
    </nav>

    <main className="container is-max-widescreen mt-6 px-4">
      <Outlet />
    </main>

    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          Created 2022
        </p>
      </div>
    </footer>
  </>
);
