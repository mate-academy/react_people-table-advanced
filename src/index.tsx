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

const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<h1 className="title">Home Page</h1>} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
      </Route>
    </Routes>
  </Router>
);

createRoot(document.getElementById('root') as HTMLDivElement).render(<Root />);
