import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PeopleContextProvider } from './components/PeopleContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NewPerson } from './pages/NewPerson';

import './App.scss';

export const App: React.FC = () => {
  return (
    <PeopleContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="people" element={<PeoplePage />}>
            <Route path=":personId" element={<PeoplePage />} />
          </Route>
          <Route path="/people/new" element={<NewPerson />} />
        </Route>
      </Routes>
    </PeopleContextProvider>
  );
};
