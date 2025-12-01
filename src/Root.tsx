import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { HomePage } from './components/pages/HomePage';
import { PeoplePage } from './components/pages/PeoplePage';

export const Root: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route index element={<HomePage />} />

          <Route path="people">
            <Route path=":userId?" element={<PeoplePage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};
