import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './App.scss';

import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <Navbar />
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />
          <Route
            path="/people"
          >
            <Route index element={<PeoplePage />} />
            <Route
              path=":personName"
              element={<PeoplePage />}
            />
          </Route>
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </div>
    </main>
  </div>
);
