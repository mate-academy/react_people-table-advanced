import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  HashRouter,
  useSearchParams,
} from 'react-router-dom';
import { getPeople } from './api';
import { Person } from './types/Person';
import { NotFoundPage } from './components/Loader/NotFoundPage';
import { PeoplePage } from './components/Loader/PeoplePage';
import { HomePage } from './components/Loader/HomePage';
import { Navbar } from './Navbar';

import './App.scss';

const AppContent: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  const sexParam = searchParams.get('sex');
  const queryParam = (searchParams.get('query') || '').toLowerCase().trim();
  const centuriesParams = searchParams.getAll('centuries');
  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');

  const visiblePeople = people.filter(person => {
    if (sexParam === 'm' && person.sex !== 'm') {
      return false;
    }

    if (sexParam === 'f' && person.sex !== 'f') {
      return false;
    }

    if (queryParam) {
      const matchesName = person.name.toLowerCase().includes(queryParam);
      const matchesMother = person.motherName
        ? person.motherName.toLowerCase().includes(queryParam)
        : false;
      const matchesFather = person.fatherName
        ? person.fatherName.toLowerCase().includes(queryParam)
        : false;

      if (!matchesName && !matchesMother && !matchesFather) {
        return false;
      }
    }

    if (centuriesParams.length > 0) {
      const centuryOfBorn = Math.ceil(person.born / 100).toString();

      if (!centuriesParams.includes(centuryOfBorn)) {
        return false;
      }
    }

    return true;
  });

  if (sortParam) {
    visiblePeople.sort((a, b) => {
      const valueA = a[sortParam as keyof Person];
      const valueB = b[sortParam as keyof Person];

      if (valueA === undefined || valueA === null) {
        return 1;
      }

      if (valueB === undefined || valueB === null) {
        return -1;
      }

      let result = 0;

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        result = valueA - valueB;
      } else {
        result = String(valueA).localeCompare(String(valueB));
      }

      return orderParam === 'desc' ? -result : result;
    });
  }

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
                path=":slug?"
                element={
                  <PeoplePage
                    people={visiblePeople}
                    loading={loading}
                    errorMessage={errorMessage}
                  />
                }
              />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};
