import { createRoot } from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { Home } from './pages/Home/Home';
import { People } from './pages/People/People';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <HashRouter>
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="/people" element={<People />}>
        <Route path=":personSlug" element={<People />} />
        </Route>

        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  </HashRouter>
);
