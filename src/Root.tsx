import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { WAYS } from './utils/ways';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={WAYS.HOME} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path={`${WAYS.PEOPLE}/:slugs?`} element={<PeoplePage />} />
          <Route path="home" element={<Navigate to={WAYS.HOME} replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
