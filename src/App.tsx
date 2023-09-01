import {
  Navigate, Route, Routes, useSearchParams,
} from 'react-router-dom';
import './App.scss';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Navbar } from './components/Navbar';
import { Person } from './types';
import { getPeople } from './api';
import { filterPeople } from './utils/filterPeople';
import { sortPeople } from './utils/sortPeople';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const LoadPeople = useCallback(async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    LoadPeople();
  }, []);

  const filteredPeople = useMemo(() => {
    return filterPeople(people, query, sex, centuries);
  }, [people, query, sex, centuries]);

  const sortedPeople = useMemo(() => {
    return sortPeople(filteredPeople, sortBy, order);
  }, [people, sortBy, order, query, sex, centuries]);

  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people">
              <Route
                index
                element={(
                  <PeoplePage
                    people={sortedPeople}
                    isError={isError}
                    isLoading={isLoading}
                  />
                )}
              />
              <Route
                path=":slug"
                element={(
                  <PeoplePage
                    people={sortedPeople}
                    isError={isError}
                    isLoading={isLoading}
                  />
                )}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
