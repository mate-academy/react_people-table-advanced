import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { getPeople } from './api';
import { Person } from './types';

export const App = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handlerClickOnPeopleTable = () => {
    setLoading(true);
    getPeople()
      .then((persons) => setPeople(persons))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  return (
    <div data-cy="app">
      <Navbar
        handlerClickOnPeopleTable={handlerClickOnPeopleTable}
      />

      <div className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            />
            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />

            <Route path="people">
              <Route
                index
                element={(
                  <PeoplePage
                    loading={loading}
                    people={people}
                    error={error}
                  />
                )}
              />

              <Route
                path=":personData"
                element={(
                  <PeoplePage
                    loading={loading}
                    people={people}
                    error={error}
                  />
                )}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};
