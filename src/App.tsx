import { FC } from 'react';
import {
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import cn from 'classnames';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import './App.scss';

export const App: FC = () => {
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
              className={({ isActive }) => cn(
                'navbar-item',
                { 'has-background-grey-lighter': isActive },
              )}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => cn(
                'navbar-item',
                { 'has-background-grey-lighter': isActive },
              )}
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
            <Route path="/" element={<HomePage />} />

            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route
              path="*"
              element={
                <h1 className="title">Page not found</h1>
              }
            />

            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
