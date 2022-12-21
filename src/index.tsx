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
import { Home } from './Pages/Home';
import { People } from './Pages/People';
import { PageNotFound } from './Pages/PageNotFound';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<PageNotFound />} />

          <Route index element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="/people">
            <Route index element={<People />} />
            <Route path=":urlSlug" element={<People />} />
          </Route>
        </Route>
      </Routes>
    </Router>,
  );
