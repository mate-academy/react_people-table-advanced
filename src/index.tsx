import { createRoot } from 'react-dom/client';
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { HomePage } from './components/HomePage/HomePage';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<NotFoundPage />} />

          <Route index element={<HomePage />} />

          <Route path="people" element={<PeoplePage />}>
            <Route index element={<PeoplePage />} />

            <Route path=":slag" element={<PeoplePage />} />
          </Route>

          <Route path="home" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>,
  );
