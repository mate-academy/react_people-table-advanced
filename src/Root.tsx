import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Path } from './types/Path';
import { App } from './App';
import { HomePage } from './Pages/HomePage';
import { NotFound } from './Pages/NotFoundPage';
import { PeoplePage } from './Pages/PeoplePage';

export const Root: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path={Path.main} element={<App />}>
        <Route index element={<HomePage />} />
        <Route
          path={Path.home}
          element={<Navigate to={Path.main} replace={true} />}
        />
        <Route path={Path.people} element={<PeoplePage />}>
          <Route path={Path.personSlug} element={<PeoplePage />} />
        </Route>
        <Route path={Path.other} element={<NotFound />} />
      </Route>
    </Routes>
  </HashRouter>
);
