import { FC } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { App } from './App';

import { HomePage, NotFoundPage, PeoplePage } from './pages';

export const Root: FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
