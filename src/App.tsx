import { Routes, Route } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { HomePage } from './components/HomePage';
import { useState } from 'react';
import { Person } from './types';

export const App = () => {
  const [peopleApi, setPeopleApi] = useState<Person[]>([]);

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/people"
              element={
                <PeoplePage setPeopleApi={setPeopleApi} peopleApi={peopleApi} />
              }
            />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
