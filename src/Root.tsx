import { Routes, Route } from 'react-router-dom';

import { App } from './App';
import React from 'react';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="people" element={<PeoplePage />} />
      <Route path="people/:slug" element={<PeoplePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
