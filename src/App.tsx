import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { useState } from 'react';
import { Person } from './types';
import { PageNotFound } from './components/PageNotFound';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route
              path="people"
              element={<PeoplePage people={people} setPeople={setPeople} />}
            >
              <Route
                index
                element={<PeoplePage people={people} setPeople={setPeople} />}
              />
              <Route
                path=":slug"
                element={<PeoplePage people={people} setPeople={setPeople} />}
              />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
