import { Routes, Route, Navigate } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<h1 className="title">Home Page</h1>} />

            {/* Redirect from /home to / */}
            <Route path="/home" element={<Navigate to="/" replace />} />

            {/* People Page (handles /people and /people/:slug) */}
            <Route path="/people/*" element={<PeoplePage />} />

            {/* 404 Page not found */}
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
