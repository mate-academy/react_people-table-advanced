/* eslint-disable react-hooks/exhaustive-deps */
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types';
import { SortParams } from './components/types';

export const App = () => {
  const [loadingPeople, setLoadingPeople] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);

  const [searchParams] = useSearchParams();

  const filterSex = searchParams.get('sex') || '';
  const filterQuery = searchParams.get('query') || '';
  const filterCentury = searchParams.getAll('centuries') || [];
  const filterSort = searchParams.get('sort') || '';
  const filterOrder = searchParams.get('order') || '';

  const getCentury = (year: number) => {
    if (year < 0) {
      return null;
    }

    return Math.ceil(year / 100);
  };

  //func to sort the array
  const handleSortFunction = ({ peopleInFunc, sortType, desc }: SortParams) => {
    const sortedPeople = [...peopleInFunc];

    switch (sortType) {
      case 'name':
        sortedPeople.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'sex':
        sortedPeople.sort((a, b) => a.sex.localeCompare(b.sex));
        break;
      case 'born':
        sortedPeople.sort((a, b) => a.born - b.born);
        break;
      case 'died':
        sortedPeople.sort((a, b) => a.died - b.died);
        break;
      default:
        break;
    }

    if (desc) {
      sortedPeople.reverse();
    }

    setVisiblePeople(sortedPeople);
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

  useEffect(() => {
    let filteredPeople = people;

    if (filterSex) {
      filteredPeople = filteredPeople.filter(
        person => person.sex === filterSex,
      );
    }

    if (filterQuery) {
      filteredPeople = filteredPeople.filter(person =>
        person.name.toLowerCase().includes(filterQuery.toLowerCase()),
      );
    }

    if (filterCentury.length > 0) {
      filteredPeople = filteredPeople.filter(person => {
        const century = getCentury(person.born);

        return filterCentury.includes(century?.toString() || '');
      });
    }

    setVisiblePeople(filteredPeople);

    handleSortFunction({
      peopleInFunc: filteredPeople,
      sortType: filterSort,
      desc: filterOrder,
    });
  }, [filterSex, filterQuery, filterCentury, filterSort, filterOrder, people]);

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" replace={true} />} />
            <Route
              path="/people/:personId?"
              element={
                <PeoplePage
                  people={visiblePeople}
                  error={error}
                  loadingPeople={loadingPeople}
                />
              }
            ></Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};
