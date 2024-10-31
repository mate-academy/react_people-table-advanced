import { createRoot } from 'react-dom/client';
import { Navigate, Route, HashRouter, Routes } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFound';
import { PeoplePage } from './components/PeoplePage';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <html className="has-navbar-fixed-top">
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path={`:slug?`} element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </html>,
);
