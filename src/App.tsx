import {
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { Navbar } from './components/Navbar';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

export const App = () => (
  <Routes>
    <Route
      path="/"
      element={(
        <div data-cy="app">
          <Navbar />

          <main className="section">
            <div className="container">
              <Outlet />
            </div>
          </main>
        </div>
      )}
    >
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />

      <Route path="people">
        <Route index element={<PeoplePage />} />
        <Route path=":slug" element={<PeoplePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
