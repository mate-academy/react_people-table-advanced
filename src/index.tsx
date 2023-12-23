import { createRoot } from 'react-dom/client';
import {
  Navigate,
  Outlet,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { PeoplePage } from './components/PeoplePage';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <Routes>
        <Route
          path="/"
          element={<App />}
        >
          <Route
            path="/"
            element={<h1 className="title">Home Page</h1>}
          />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route
            path="people/:slug?"
            element={(
              <Outlet />
            )}
          >
            <Route index element={<PeoplePage />} />
          </Route>

          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Route>
      </Routes>
    </Router>,
  );
