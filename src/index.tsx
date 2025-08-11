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
import { PeopleProvider } from './Context';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <PeopleProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/home" element={<Navigate to="/" replace={true} />} />
          <Route path="/people/:slug?" element={<PeoplePage />} />
          <Route
            path="/*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Route>
      </Routes>
    </PeopleProvider>
    ,
  </Router>,
);
