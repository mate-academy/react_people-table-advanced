import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import './App.scss';
import { Navigation } from './components/Navbar';
import { HomePage } from './components/pages/HomePage';
import { PeoplePage } from './components/pages/PeoplePage';
import { NotFoundPage } from './components/pages/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />
      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/people">
              <Route path=":personSlug?" element={<PeoplePage />} />
            </Route>

            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
