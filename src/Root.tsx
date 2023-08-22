import {
  Route, HashRouter as Router, Routes, Navigate,
} from 'react-router-dom';
import React from 'react';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';
import { App } from './App';
import { NotFoundPage } from './Pages/NotFoundPage';

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="people" element={<PeoplePage />}>
          <Route path=":peopleSlug" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
