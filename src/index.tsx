import { createRoot } from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeopleContext } from './contexts/PeopleContext';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { PageNotFound } from './pages/PageNotFound';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to=".." replace />} />
        <Route path="people">
          <Route
            path=":slug?"
            element={
              <PeopleContext.Provider>
                <PeoplePage />
              </PeopleContext.Provider>
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
    <App />
  </HashRouter>,
);
