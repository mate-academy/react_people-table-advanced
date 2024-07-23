/* eslint-disable react-hooks/exhaustive-deps */
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types';
import { SortParams } from './components/types';
import { getCentury } from './components/AdditionalVars';

export const App = () => {
  const [loadingPeople, setLoadingPeople] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[]>([]);

  const [searchParams] = useSearchParams();

  const filterSex = searchParams.get('sex') || '';
  const filterQuery = searchParams.get('query') || '';
  const filterCentury = searchParams.getAll('centuries') || [];
  const filterSort = searchParams.get('sort') || '';
  const filterOrder = searchParams.get('order') || '';

  const handleSortFunction = ({ peopleInFunc, sortType, desc }: SortParams) => {
    const sortedPeople = [...peopleInFunc];

    switch (sortType) {
      case 'name':
      case 'sex':
        sortedPeople.sort((a, b) => a[sortType].localeCompare(b[sortType]));
        break;
      case 'born':
      case 'died':
        sortedPeople.sort((a, b) => a[sortType] - b[sortType]);
        break;
      default:
        break;
    }

    if (desc) {
      sortedPeople.reverse();
    }

    return sortedPeople;
  };

  const getVisiblePeople = () => {
    const applyFilters = () => {
      return people
        .filter(person => !filterSex || person.sex === filterSex)
        .filter(
          person =>
            !filterQuery ||
            person.name.toLowerCase().includes(filterQuery.toLowerCase()),
        )
        .filter(
          person =>
            filterCentury.length === 0 ||
            filterCentury.includes(getCentury(person.born)?.toString() || ''),
        );
    };

    const filteredPeople = applyFilters();

    return handleSortFunction({
      peopleInFunc: filteredPeople,
      sortType: filterSort,
      desc: filterOrder,
    });
  };

  useEffect(() => {
    setLoadingPeople(true);

    getPeople()
      .then(peopl => {
        const peopleWithParents = peopl.map(person => {
          return {
            ...person,
            mother: peopl.find(p => p.name === person.motherName),
            father: peopl.find(p => p.name === person.fatherName),
          };
        });

        setPeople(peopleWithParents);
      })
      .catch(() => setError(true))
      .finally(() => setLoadingPeople(false));
  }, []);

  const visiblePeople = getVisiblePeople();

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route
              path="/people/:personId?"
              element={
                <PeoplePage
                  people={people}
                  error={error}
                  loadingPeople={loadingPeople}
                  visiblePeople={visiblePeople}
                />
              }
            />
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
