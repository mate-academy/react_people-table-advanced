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
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="people">
          <Route path=":personId?" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<h1 className="title">Page not found</h1>} />

        <Route path="home" element={<Navigate to=".." replace />} />
      </Route>
    </Routes>
  </Router>,
);
