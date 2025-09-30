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
import { NotFound } from './components/NotFound';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/Home';
import React from 'react';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":personSlug" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>,
);
