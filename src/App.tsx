import { Navbar } from './components/Navbar';

import './App.scss';
import { useEffect, useState } from 'react';
import { Person } from './types';
import { getPeople } from './api';
import { Outlet } from 'react-router-dom';

export const App = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage(true);
      })
      .finally(() => setLoader(false));
  }, []);

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Outlet context={{ loader, people, errorMessage }} />
        </div>
      </div>
    </div>
  );
};
