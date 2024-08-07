import { createRoot } from 'react-dom/client';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Navigate to={'/'} replace />} />
        <Route index element={<HomePage />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":personSlug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>,
);
