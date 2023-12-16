import { createRoot } from 'react-dom/client';
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import { Page404 } from './pages/Page404';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route index element={<HomePage />} />
          <Route path="people">
            <Route path=":humanId?" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </Router>,
  );
