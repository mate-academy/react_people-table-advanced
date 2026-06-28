import { createRoot } from 'react-dom/client';
import { Route, HashRouter, Routes, Navigate } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <HashRouter>
    <Routes>
      <Route path={'/'} element={<App />}>
        <Route index element={<HomePage />} />
        <Route path={'/home'} element={<Navigate to={'/'} replace />} />
        <Route path={'/people'}>
          <Route index element={<PeoplePage />} />
          <Route path={':slug'} element={<PeoplePage />} />
        </Route>
        <Route path={'*'} element={<NotFoundPage />} />
      </Route>
    </Routes>
  </HashRouter>,
);
