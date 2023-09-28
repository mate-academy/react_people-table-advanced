import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Navbar } from './components/Navbar';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />

              <Route path="people">
                <Route index element={<PeoplePage />} />
                <Route path=":personSlug?" element={<PeoplePage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
