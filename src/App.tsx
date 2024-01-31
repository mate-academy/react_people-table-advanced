import {
  Navigate, Route, Routes, useSearchParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import './App.scss';
import { getPeople } from './api';
import { Person } from './types';
import { HomePage } from './components/HomePage';
import { NotFound } from './components/NotFound';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, []);

  const getPreparedPeople = () => {
    let sortedPeople = [...people];

    if (sex) {
      sortedPeople = sortedPeople.filter((per) => per.sex === sex);
    }

    if (query) {
      const lowerCaseQuery = query.toLowerCase();

      sortedPeople = sortedPeople.filter(
        (per) => per.name.toLowerCase().includes(lowerCaseQuery)
        || per.motherName?.toLowerCase().includes(lowerCaseQuery)
        || per.fatherName?.toLowerCase().includes(lowerCaseQuery),
      );
    }

    if (centuries.length > 0) {
      sortedPeople = sortedPeople.filter((per) => centuries.includes(String(
        Math.ceil(per.born / 100),
      )));
    }

    if (sort) {
      switch (sort) {
        case 'name':
        case 'sex':
          sortedPeople.sort((a, b) => a[sort].localeCompare(b[sort]));
          break;
        case 'born':
        case 'died':
          sortedPeople.sort((a, b) => a[sort] - b[sort]);
          break;
        default:
          return sortedPeople;
      }
    }

    if (order) {
      sortedPeople.reverse();
    }

    return sortedPeople;
  };

  const preparedPeople = getPreparedPeople();

  return (
    <div data-cy="app">
      <Navbar />
      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people">
              <Route
                index
                element={(
                  <PeoplePage
                    isError={isError}
                    people={preparedPeople}
                    loading={loading}
                  />
                )}
              />
              <Route
                path=":slug"
                element={(
                  <PeoplePage
                    isError={isError}
                    people={preparedPeople}
                    loading={loading}
                  />
                )}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
