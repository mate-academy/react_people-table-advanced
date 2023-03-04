import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage';
import { Navbar } from './components/NavBar';

import './App.scss';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFound';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/">
              <Route
                index
                element={<HomePage />}
              />
              <Route path="/home" element={<Navigate to="/" replace />} />
            </Route>
            <Route path="/people">
              <Route
                index
                element={<PeoplePage />}
              />
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
