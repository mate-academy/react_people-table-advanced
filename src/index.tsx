import { createRoot } from 'react-dom/client';
import {
  Navigate, Route, HashRouter as Router, Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageError } from './components/PageError';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="People" element={<PeoplePage />}>
            <Route path=":personId" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<PageError />} />
        </Route>
      </Routes>
    </Router>,
  );
