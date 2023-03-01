import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { NotFoundPage } from './components/NoFoundPage';
import { HomePage } from './components/HomePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <div className="block">
            <div className="box table-container">
              <Routes>
                <Route
                  path="/"
                  element={<HomePage />}
                />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route
                  path="*"
                  element={<NotFoundPage />}
                />

                <Route path="people">
                  <Route index element={<PeoplePage />} />
                  <Route path=":personSlug" element={<PeoplePage />} />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
