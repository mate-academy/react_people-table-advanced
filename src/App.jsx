import './App.scss';
import 'bulma';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Header } from './components/Header';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { PageNotFound } from './components/PageNotFound';
import { NewPerson } from './components/NewPerson/NewPerson';
import { PeopleProvider } from './components/PeopleContext';

const App = () => (
  <PeopleProvider>
    <div className="App">

      <Header />

      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":selectedSlug" element={<PeoplePage />} />
        </Route>
        <Route
          path="people/new"
          element={<NewPerson />}
        />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </div>
  </PeopleProvider>
);

export default App;
