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
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="home" element={<Navigate to=".." />} />
          <Route path="people">
            <Route path=":slug?" element={<PeoplePage />} />
          </Route>
        </Route>
      </Routes>
    </Router>,
  );
