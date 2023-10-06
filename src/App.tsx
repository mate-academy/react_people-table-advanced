import { Routes, Route, Navigate } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { HomePage } from './pages/HomePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/home"
              element={<Navigate to="/" />}
            />
            <Route
              path="/people"
              element={<PeoplePage />}
            />
            <Route
              path="/people/:personSlug?"
              element={<PeoplePage />}
            />
            <Route
              path="/*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
