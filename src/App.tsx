import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import './App.scss';
import { Person } from './types';
import { getPeople } from './api';

export const App = () => {
  const [person, setPerson] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPerson)
      .finally(() => setIsLoading(false));
  }, [setPerson, setIsLoading]);

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="people">
              <Route
                index
                element={<PeoplePage person={person} isLoading={isLoading} />}
              />
              <Route
                path="/people/:slug"
                element={<PeoplePage person={person} isLoading={isLoading} />}
              />
            </Route>
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
