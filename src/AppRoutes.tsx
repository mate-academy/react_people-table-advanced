import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';

import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="people">
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
