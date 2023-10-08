import {
  NavLink, Routes, Route, Navigate,
} from 'react-router-dom';
import classNames from 'classnames';

import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

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
            className={({ isActive }) => {
              return classNames('navbar-item',
                { 'has-background-grey-lighter': isActive });
            }}
          >
            Home

          </NavLink>
          <NavLink
            to="/people"
            className={({ isActive }) => {
              return classNames('navbar-item',
                { 'has-background-grey-lighter': isActive });
            }}
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
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug?" element={<PeoplePage />} />
          </Route>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
