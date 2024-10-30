import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useFilters } from '../hooks/useFilters';

const filteringPeople = (
  peopleArray: Person[],
  filters: { sexInSearch: string | null; query: string; cents: string[] },
) => {
  let peopleArrayCopy = [...peopleArray];

  switch (filters.sexInSearch) {
    case 'm':
      peopleArrayCopy = peopleArrayCopy.filter(person => person.sex === 'm');
      break;
    case 'f':
      peopleArrayCopy = peopleArrayCopy.filter(person => person.sex === 'f');
      break;
    default:
      break;
  }

  if (filters.query) {
    peopleArrayCopy = peopleArrayCopy.filter(person =>
      person.name.toLowerCase().includes(filters.query.toLowerCase().trim()),
    );
  }

  if (filters.cents.length !== 0) {
    peopleArrayCopy = peopleArrayCopy.filter(person =>
      filters.cents.includes(`${Math.floor(person.born / 100) + 1}`),
    );
  }

  return peopleArrayCopy;
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingError, setFetchingError] = useState(false);
  const { sexInSearch, query, cents } = useFilters();

  useEffect(() => {
    setIsLoading(true);
    setFetchingError(false);

    getPeople()
      .then(fetchedPeople => setPeople(fetchedPeople))
      .catch(() => setFetchingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = filteringPeople(people, { sexInSearch, query, cents });

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
              {fetchingError ? (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              ) : (
                <PeopleTable people={filteredPeople} isLoading={isLoading} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
