import { createRoot } from 'react-dom/client';
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { PeoplePage } from './pages/PeoplePage';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":personId" element={<PeoplePage />} />
          </Route>

          <Route index element={<h1 className="title">Home Page</h1>} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
      </Routes>
    </HashRouter>,
  );
