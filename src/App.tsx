import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Header } from './Components/Header';
import { HomePage } from './Components/HomePage';
import { PeoplePage } from './Components/PeoplePage';
import { NewPerson } from './Components/NewPerson';
import { PeopleProvider } from './Components/PeopleContext';

export const App: React.FC = () => {
  return (
    <PeopleProvider>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />
          <Route path="/people/new" element={<NewPerson />} />
          <Route path="*" element={<h1>Error 404: Page not found</h1>} />
        </Routes>
      </div>
    </PeopleProvider>
  );
};
