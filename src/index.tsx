import { createRoot } from 'react-dom/client';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { People } from './components/people';
import { App } from './App';
import { MyProvider } from './components/state';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <MyProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<h1 className="title">Home Page</h1>} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route
            path="people/:personId?"
            element={
              <>
                <People />
              </>
            }
          />

          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
      </Routes>
    </MyProvider>
  </Router>,
);
