import { createRoot } from 'react-dom/client';
import {
  Navigate, Route, HashRouter as Router, Routes,
} from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route
            path="*"
            element={<NotFoundPage />}
          />
          <Route
            path="home"
            element={<Navigate replace to="/" />}
          />
        </Route>
      </Routes>
    </Router>,
  );
