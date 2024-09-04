import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { NotFound } from './pages/NotFound/NotFound';
import { App } from './App';
import { RoutesLink } from './types/Routes';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={RoutesLink.MainPage} element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path={RoutesLink.HomePage}
            element={<Navigate to={RoutesLink.MainPage} replace={true} />}
          />
          <Route path={RoutesLink.PeoplePage}>
            <Route index element={<PeoplePage />} />
            <Route path={RoutesLink.PersonSlug} element={<PeoplePage />} />
          </Route>
          <Route path={RoutesLink.NotFound} element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
