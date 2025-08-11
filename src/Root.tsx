import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { ROUTES } from './utils/ways';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path={`${ROUTES.PEOPLE}/:slugs?`} element={<PeoplePage />} />
          <Route path="home" element={<Navigate to={ROUTES.HOME} replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
