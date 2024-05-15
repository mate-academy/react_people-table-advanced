import './App.scss';

import { NavLink, Navigate, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import PeoplePage from './components/PeoplePage';

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
              'navbar-item ' + (isActive ? 'has-background-grey-lighter' : '')
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/people"
            className={({ isActive }) =>
              'navbar-item ' + (isActive ? 'has-background-grey-lighter' : '')
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
          <Route path="/home" element={<Navigate to="/" replace />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/people" element={<PeoplePage />}></Route>
          <Route path="/people/:personSlug" element={<PeoplePage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </main>
  </div>
);
