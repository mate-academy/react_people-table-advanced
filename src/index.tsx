import { createRoot } from 'react-dom/client';
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { HomePage, NotFoundPage, PeoplePage } from './pages';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="people">
          <Route path=":currentSlug?" element={<PeoplePage />} />
        </Route>
        <Route path="home" element={<Navigate to="/" replace={true} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>,
);
