import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';
import { PeoplePage } from './pages/PeoplePage';
import { Path } from './types/Enums';

export const Root = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<App />}>
        <Route index element={<HomePage />} />
        <Route path={Path.Home} element={<Navigate to=".." replace />} />
        <Route path={Path.People}>
          <Route path={Path.PersonSlug} element={<PeoplePage />} />
        </Route>
        <Route path={Path.Other} element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
