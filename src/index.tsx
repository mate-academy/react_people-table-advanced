import { createRoot } from 'react-dom/client';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { Title } from './components/Title';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":user" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<Title text="Page not found" />} />
        <Route path="home" element={<Navigate to={'/'} replace />} />
      </Route>
    </Routes>
  </Router>,
);
