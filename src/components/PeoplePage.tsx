/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

const validSortFields = ['name', 'sex', 'born', 'died'];

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sexFilter = searchParams.get('sex');
  const centuriesFilter = searchParams.getAll('centuries');

  const rawSortField = searchParams.get('sort');
  const sortField = validSortFields.includes(rawSortField as string)
    ? (rawSortField as keyof Person)
    : null;

  const sortOrder = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = people.filter(person => {
    if (sexFilter && person.sex !== sexFilter) {
      return false;
    }

    if (query) {
      const matchesName = person.name.toLowerCase().includes(query);
      const matchesMother =
        person.motherName?.toLowerCase().includes(query) || false;
      const matchesFather =
        person.fatherName?.toLowerCase().includes(query) || false;

      if (!matchesName && !matchesMother && !matchesFather) {
        return false;
      }
    }

    if (centuriesFilter.length > 0) {
      const personCentury = Math.ceil(person.born / 100).toString();

      if (!centuriesFilter.includes(personCentury)) {
        return false;
      }
    }

    return true;
  });

  if (sortField) {
    visiblePeople.sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];

      if (valueA == null && valueB == null) {
        return 0;
      }

      if (valueA == null) {
        return 1;
      }

      if (valueB == null) {
        return -1;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return valueA - valueB;
      }

      return 0;
    });

    if (sortOrder === 'desc') {
      visiblePeople.reverse();
    }
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="columns">
        <div className="column is-one-third">
          {!isLoading && !error && <PeopleFilters />}
        </div>

        <div className="column">
          <div className="block">
            {isLoading && <Loader />}

            {!isLoading && error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!isLoading && !error && visiblePeople.length > 0 && (
              <PeopleTable people={visiblePeople} />
            )}

            {!isLoading && !error && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!isLoading &&
              !error &&
              people.length > 0 &&
              visiblePeople.length === 0 && (
                <p data-cy="noPeopleMessage">No people found</p>
              )}
          </div>
        </div>
      </div>
    </>
  );
};
