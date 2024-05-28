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
import React from 'react';
import { GlobalProvider } from './context/reducer';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/home" element={<Navigate to="/" />} />
          <Route index element={<HomePage />} />

          <Route path="/people" element={<PeoplePage />}>
            <Route path=":slugName" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </GlobalProvider>
  </Router>,
);
