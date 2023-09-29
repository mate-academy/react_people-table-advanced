import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';

import './App.scss';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { Person } from './types';
import { getPeople } from './api';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [arePeoplePresent, setArePeoplePresent] = useState(true);

  const fetchData = async () => {
    try {
      const getPeopleFromServer = await getPeople();

      if (getPeopleFromServer.length === 0) {
        setArePeoplePresent(false);
      }

      setPeople(getPeopleFromServer);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/people">
              <Route
                path=":peopleSlug"
                element={(
                  <PeoplePage
                    people={people}
                    isLoading={isLoading}
                    isError={isError}
                    arePeoplePresent={arePeoplePresent}
                  />
                )}
              />

              <Route
                index
                element={(
                  <PeoplePage
                    people={people}
                    isLoading={isLoading}
                    isError={isError}
                    arePeoplePresent={arePeoplePresent}
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
