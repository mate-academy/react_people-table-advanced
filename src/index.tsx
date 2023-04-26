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
        <Route path={PageRouters.Home} element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path="home"
            element={<Navigate to={PageRouters.Home} replace />}
          />
          <Route path={PageRouters.People}>
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>

          <Route path={PageRouters.NotFound} element={<ErrorPage />} />
        </Route>
      </Routes>
    </HashRouter>,
  );
