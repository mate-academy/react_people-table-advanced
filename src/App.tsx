import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';

import { Layout } from './components/Layout/Layout';
import { HomePage } from './components/pages/HomePage/HomePage';
import { PeoplePage } from './components/pages/PeoplePage/PeoplePage';
import { NewPerson } from './components/pages/PeoplePage/NewPerson';
import { NotFoundPage } from './components/pages/NotFoundPage/NotFoundPage';
import { PeopleProvider } from './components/hoc/PeopleProvider';

export const App: React.FC = () => (
  <PeopleProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/home"
          element={
            <Navigate to="/" replace />
          }
        />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="people/new" element={<NewPerson />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </PeopleProvider>
);

export default App;
