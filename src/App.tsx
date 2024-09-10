import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './HomePage/HomePage';
import { PeoplePage } from './PeoplePage/PeoplePage';
import { NotFoundPage } from './NotFoundPage/NotFoundPage';
import { Navigation } from './Navigation/Navigation';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <Navigation />
      <main className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};
