import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<h1 className="title">Home Page</h1>} />
        <Route path="people/:slug?" element={<PeoplePage />} />
        <Route
          path=":currentText"
          element={<h1 className="title">Page not found</h1>}
        />
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  </Router>,
);
