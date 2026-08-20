import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import type { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const normalizedQuery = (searchParams.get('query') || '').toLowerCase();
  const sex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');
  const visiblePeople = people.filter(person => {
    const matchesQuery =
      person.name.toLowerCase().includes(normalizedQuery) ||
      (person.motherName || '').toLowerCase().includes(normalizedQuery) ||
      (person.fatherName || '').toLowerCase().includes(normalizedQuery);
    const matchesSex = !sex || person.sex === sex;
    const matchesCentury =
      selectedCenturies.length === 0 ||
      selectedCenturies.includes(String(Math.ceil(person.born / 100)));

    return matchesQuery && matchesSex && matchesCentury;
  });
  const sortedPeople = [...visiblePeople];
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  if (sort) {
    sortedPeople.sort((personA, personB) => {
      let result = 0;

      switch (sort) {
        case 'name':
          result = personA.name.localeCompare(personB.name);
          break;

        case 'sex':
          result = personA.sex.localeCompare(personB.sex);
          break;

        case 'born':
          result = personA.born - personB.born;
          break;

        case 'died':
          result = personA.died - personB.died;
          break;
      }

      return order === 'desc' ? -result : result;
    });
  }

  useEffect(() => {
    getPeople()
      .then(loadedPeople => setPeople(loadedPeople))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const hasNoMatchingPeople =
    !isLoading && !isError && people.length > 0 && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !isError && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !isError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {hasNoMatchingPeople && (
                <p>There are no people matching the current search criteria</p>
              )}
              {!isLoading && !isError && visiblePeople.length > 0 && (
                <PeopleTable people={sortedPeople} allPeople={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
