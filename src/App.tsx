import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';

import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/people" replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="*" element={<Navigate to="/people" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
