import {
  Navigate, Route, Routes,
} from 'react-router-dom';

import './App.scss';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { WrongUrlPage } from './pages/WrongUrlPage';

export const App = () => (
  <div data-cy="app">

    <Navigation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="*"
            element={<WrongUrlPage />}
          />
          <Route
            path="home"
            element={<Navigate to="/" replace />}
          />
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="people"
            element={<PeoplePage />}
          >
            <Route
              path=":peopleSlug"
            />
            <Route
              index
            />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
