import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { PeopleProvider } from './stores/PeopleContext';
import { PeoplePage } from './components/PeoplePage';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <PeopleProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<h1 className="title">Home Page</h1>} />

            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slugPerson" element={<PeoplePage />} />
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Route>
        </Routes>
      </PeopleProvider>
    </Router>,
  );
