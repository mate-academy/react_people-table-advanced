import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';

import { PeopleProvider } from './components/PeopleContext';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { NewPerson } from './components/NewPerson';

const App:React.FC = () => {
  return (
    <PeopleProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="people" element={<PeoplePage />}>
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="people/new" element={<NewPerson />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </PeopleProvider>
  );
};

export default App;
