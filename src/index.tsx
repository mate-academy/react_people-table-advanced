import { createRoot } from 'react-dom/client';
import {
  HashRouter, Navigate, Route, Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { PageRouters } from './types/PageRouters';
import { ErrorPage } from './Pages/ErrorPage';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <HashRouter>
      <Routes>
        <Route path={PageRouters.home} element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path="home"
            element={<Navigate to={PageRouters.home} replace />}
          />
          <Route path={PageRouters.people}>
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>

          <Route path={PageRouters.notFound} element={<ErrorPage />} />
        </Route>
      </Routes>
    </HashRouter>,
  );
