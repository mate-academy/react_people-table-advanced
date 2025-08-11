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
import { HomePages } from './components/HomePages';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePages />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="/people" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>,
);
