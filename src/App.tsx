import './App.scss';

import { Route, Routes, Navigate, NavLink } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

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
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) =>
              isActive
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
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
          <Route path="/people/:slug" element={<PeoplePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
