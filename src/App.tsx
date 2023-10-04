import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import './App.scss';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />

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
            element={<PeoplePage />}
          >
            <Route path=":personSlug" />
          </Route>
          <Route
            path="/*"
            element={<NotFoundPage />}
          />
        </Routes>
      </div>
    </main>
  </div>
);
