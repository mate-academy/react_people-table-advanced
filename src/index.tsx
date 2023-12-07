import { createRoot } from 'react-dom/client';
import {
  Route, HashRouter, Routes, Navigate,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/home" element={<Navigate to="/" />} />
          <Route index element={<HomePage />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":personSlug?" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
      </Routes>
    </HashRouter>,
  );
