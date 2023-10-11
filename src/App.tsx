import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { getPeople } from './api';
import { Person } from './types';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route index element={<h1 className="title">Home Page</h1>} />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route
              path="people"
              element={<PeoplePage people={people} setPeople={setPeople} />}
            >
              <Route
                path=":personSlug"
                element={<PeoplePage people={people} setPeople={setPeople} />}
              />
            </Route>
            <Route path="home" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
