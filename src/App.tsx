import { Navigate, Route, Routes } from 'react-router-dom';

import { PeoplePage } from './components/People/PeoplePage';
import { Navbar } from './components/Navbar';
import './App.scss';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route path="people">
              <Route
                index
                element={(
                  <PeoplePage />
                )}
              />
              <Route
                path=":slug"
                element={(
                  <PeoplePage />
                )}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
