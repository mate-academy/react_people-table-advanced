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

export const App = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then((persons) => {
        setIsLoading(true);
        setPeopleFromServer(persons);
        if (persons.length === 0) {
          setErrorMessage('There are no people on the server');
        }
      })
      .catch(() => {
        setIsError(true);
        setErrorMessage('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (!peopleFromServer) {
    return <Loader />;
  }

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route path="/people">
            <Route
              index
              element={(
                <PeoplePage
                  isError={isError}
                  setIsError={setIsError}
                  isLoading={isLoading}
                  peopleFromServer={peopleFromServer}
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
                  peopleFromServer={peopleFromServer}
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
