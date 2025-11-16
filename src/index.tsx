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
        <Route index element={<HomePage />}></Route>
        <Route path="people">
          <Route index element={<PeoplePage />}></Route>
          <Route path=":slug" element={<PeoplePage />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
      <Route path="/home" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>,
);
