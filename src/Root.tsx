import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';
import { NotFound } from './Pages/NotFound';
import { Path } from './types';

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
