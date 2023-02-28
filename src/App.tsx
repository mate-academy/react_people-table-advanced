import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage';
import { Navbar } from './components/NavBar';

import './App.scss';

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
                element={<h1 className="title">Home Page</h1>}
              />
              <Route
                path="/home"
                element={<Navigate to="/" replace />}
              />
            </Route>
            <Route path="/people">
              <Route
                index
                element={<PeoplePage />}
              />
              <Route
                path=":personSlug"
                element={<PeoplePage />}
              />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
