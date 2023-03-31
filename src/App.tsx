import { Routes, Route, Navigate } from 'react-router-dom';

import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:personId" element={<PeoplePage />} />

            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
