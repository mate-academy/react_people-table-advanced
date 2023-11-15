import classNames from 'classnames';
import {
  NavLink,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './App.scss';
import React from 'react';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotfoundPage';

export const App: React.FC = () => {
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
              className={({ isActive }) => {
                return classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                });
              }}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => {
                return classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                });
              }}
              to="/people"
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route
              path="people"
              element={(
                <PeoplePage />
              )}
            >
              <Route
                path=":slugParam"
                element={(
                  <PeoplePage />
                )}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
