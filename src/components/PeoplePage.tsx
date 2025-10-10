import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoadingPeople, setIsLoadingPeople] = useState(false);
  const [peopleError, setPeopleError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries').map(Number);
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoadingPeople(true);
    setPeopleError(null);

    getPeople()
      .then(setPeople)
      .catch(() => setPeopleError('Something went wrong'))
      .finally(() => setIsLoadingPeople(false));
  }, []);

  const getFilteredPeople = () => {
    let filtered = [...people];

    if (query) {
      const normalizedQuery = query.trim().toLowerCase();

      filtered = filtered.filter(person =>
        [person.name, person.motherName, person.fatherName].some(val =>
          val?.toLowerCase().includes(normalizedQuery),
        ),
      );
    }

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person =>
        centuries.includes(Math.floor((person.born - 1) / 100) + 1),
      );
    }

    if (sort) {
      filtered = [...filtered].sort((a, b) => {
        const fieldA = a[sort as keyof Person];
        const fieldB = b[sort as keyof Person];

        if (fieldA === null || fieldA === undefined) {
          return 1;
        }

        if (fieldB === null || fieldB === undefined) {
          return -1;
        }

        if (typeof fieldA === 'string' && typeof fieldB === 'string') {
          return order === 'desc'
            ? fieldB.localeCompare(fieldA)
            : fieldA.localeCompare(fieldB);
        }

        if (typeof fieldA === 'number' && typeof fieldB === 'number') {
          return order === 'desc' ? fieldB - fieldA : fieldA - fieldB;
        }

        return 0;
      });
    }

    return filtered;
  };

  const filteredPeople = getFilteredPeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoadingPeople && <Loader />}
              {peopleError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!isLoadingPeople && !peopleError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {/* eslint-disable @typescript-eslint/indent */}
              {!isLoadingPeople &&
                !peopleError &&
                filteredPeople.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}
              {people.length > 0 && <PeopleTable people={filteredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
