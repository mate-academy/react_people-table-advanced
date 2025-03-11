/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filterAndSortPeople = (persons: Person[]) => {
    let filtered = [...persons];

    // Filter by query
    if (query) {
      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(query) ||
        (person.motherName?.toLowerCase().includes(query)) ||
        (person.fatherName?.toLowerCase().includes(query))
      );
    }

    // Filter by sex
    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    // Filter by centuries
    if (centuries.length > 0) {
      filtered = filtered.filter(person => {
        const century = Math.floor(person.born / 100) + 1;

        return centuries.includes(century.toString());
      });
    }

    // Sort
    if (sort) {
      filtered.sort((a, b) => {
        const valueA = a[sort as keyof Person];
        const valueB = b[sort as keyof Person];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return order === 'desc'
            ? valueB.localeCompare(valueA)
            : valueA.localeCompare(valueB);
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return order === 'desc'
            ? valueB - valueA
            : valueA - valueB;
        }

        return 0;
      });
    }

    return filtered;
  };

  const visiblePeople = filterAndSortPeople(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">There are no people on the server</p>
              )}

              {!loading && !error && people.length > 0 && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !error && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
