import React from 'react';

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import { HomePage, PeoplePage, NotFoundPage } from './Pages';

import { App } from './App';

export const Root = () => {
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
