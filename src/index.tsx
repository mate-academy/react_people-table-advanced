import { createRoot } from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { PeopleProvider } from './components/PeopleContext';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';
import { PeoplePage } from './components/PeoplePage';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <HashRouter>
    <PeopleProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}></Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":selectedPerson" element={<PeoplePage />} />
          </Route>
        </Route>
      </Routes>
    </PeopleProvider>
  </HashRouter>,
);
