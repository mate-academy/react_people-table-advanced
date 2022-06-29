import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss';
import 'bulma';

import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { PeopleProvider } from './components/PeopleContext/PeopleContext';
import { NewPerson } from './components/NewPerson/NewPerson';

const App: React.FC = () => {
  return (
    <PeopleProvider>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />
          <Route path="/people/new" element={<NewPerson />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </PeopleProvider>
  );
};

export default App;
