import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />

            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=":selectedUser" element={<PeoplePage />} />
            </Route>

            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />

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
