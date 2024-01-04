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

import { HomePage } from './pages/HomePage';
import { PeoplePageContextProvider } from
  './pages/PeoplePage/PeoplePageContext/PeoplePageContext';
import { PeoplePage } from './pages/PeoplePage';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <App />
      <Routes>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="people">
            <Route
              path=":userSlug?"
              element={(
                <PeoplePageContextProvider>
                  <PeoplePage />
                </PeoplePageContextProvider>
              )}
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>,
  );
