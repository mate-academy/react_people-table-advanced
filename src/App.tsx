import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { Nav } from './components/Nav';
import { PeoplePage } from './pages/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Nav />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            />

            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
