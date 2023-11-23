import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.scss';

import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <div className="block">
            {(window.location.hash === '#/home') && (
              <Navigate to="/" replace />
            )}

            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="people/:peopleSlug?">
                <Route index element={<PeoplePage />} />
                <Route path=":peopleSlug" element={<PeoplePage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};
