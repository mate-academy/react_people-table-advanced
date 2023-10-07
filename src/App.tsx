import { Navigate, Route, Routes } from 'react-router';
import { useEffect, useState } from 'react';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { getPeople } from './api';
import { Person } from './types';
import { Loader } from './components/Loader';

enum ErrorType {
  'There are no people on the server' = 'There are no people on the server',
  'Something went wrong' = 'Something went wrong',
}

export const App = () => {
  const [people, setPeople] = useState<Person[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then((persons) => {
        setIsLoading(true);
        setPeople(persons);
        if (persons.length === 0) {
          setErrorMessage(ErrorType['There are no people on the server']);
        }
      })
      .catch(() => {
        setIsError(true);
        setErrorMessage(ErrorType['Something went wrong']);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (!people) {
    return <Loader />;
  }

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/people">
            <Route
              index
              element={(
                <PeoplePage
                  isError={isError}
                  setIsError={setIsError}
                  isLoading={isLoading}
                  peopleFromServer={people}
                  errorMessage={errorMessage}
                />
              )}
            />
            <Route
              path=":slug"
              element={(
                <PeoplePage
                  isError={isError}
                  setIsError={setIsError}
                  isLoading={isLoading}
                  peopleFromServer={people}
                  errorMessage={errorMessage}
                />
              )}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
};
