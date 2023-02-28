import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { PeoplePage } from './Pages/PeoplePage';
import { HomePage } from './Pages/HomePage';
import { NotFoundPage } from './Pages/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <div className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />

            <Route path="/people">
              <Route
                index
                element={<PeoplePage />}
              />

              <Route
                path=":slug"
                element={<PeoplePage />}
              />
            </Route>

            <Route
              path="*"
              element={<NotFoundPage />}
            />

            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
