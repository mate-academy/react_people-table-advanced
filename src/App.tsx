import { Navbar } from './components/Navbar';

import './App.scss';
import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Person } from './types';
import { getPeople } from './api';
import { PeopleContext } from './contexts/PeopleContext';
import { ErrorContext } from './contexts/ErrorContext';
import { LoaderContext } from './contexts/LoaderContext';

export const App = () => {
  const { setPeoples } = useContext(PeopleContext);
  const { setErrorMessage } = useContext(ErrorContext);
  const { setLoader } = useContext(LoaderContext);

  useEffect(() => {
    setLoader(true);

    getPeople()
      .then((loadPeoples: Person[]) => {
        setPeoples(loadPeoples);

        if (loadPeoples.length > 0) {
          setErrorMessage('');
        }
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
