import React from 'react';
import {
  Navigate, Route, HashRouter as RouterComp, Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage';

export const Router: React.FC = () => {
  return (
    <RouterComp>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
        </Route>
      </Routes>
    </RouterComp>
  );
};
