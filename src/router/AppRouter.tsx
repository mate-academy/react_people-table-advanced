import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../pages/HomePage';
import { PeoplePage } from '../pages/PeoplePage';
import { PageNotFound } from '../pages/PageNotFound';

export const AppRouter: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="people" element={<PeoplePage />} />
          <Route path="people/:slug?" element={<PeoplePage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="home" element={<Navigate to={'/'} replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
