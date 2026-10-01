/* eslint-disable @typescript-eslint/indent */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');

  // 1. Read sorting params from URL
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = useMemo(() => {
    const currentPeople = people.filter(person => {
      // Sex filter
      if (sex && person.sex !== sex) {
        return false;
      }

      // Name filter
      if (query) {
        const personName = person.name.toLowerCase();
        const motherName = person.motherName?.toLowerCase() || '';
        const fatherName = person.fatherName?.toLowerCase() || '';

        const matches =
          personName.includes(query) ||
          motherName.includes(query) ||
          fatherName.includes(query);

        if (!matches) {
          return false;
        }
      }

      // Century filter
      if (centuries.length > 0) {
        const century = Math.floor(person.born / 100) + 1;

        if (!centuries.includes(String(century))) {
          return false;
        }
      }

      return true;
    });

    // 2. Apply sorting logic based on URL params
    if (sort) {
      return [...currentPeople].sort((a, b) => {
        let comparison = 0;

        if (sort === 'name') {
          comparison = a.name.localeCompare(b.name);
        } else if (sort === 'sex') {
          comparison = a.sex.localeCompare(b.sex);
        } else if (sort === 'born') {
          comparison = a.born - b.born;
        } else if (sort === 'died') {
          comparison = a.died - b.died;
        }

        // If order is 'desc', reverse the comparison
        return order === 'desc' ? -comparison : comparison;
      });
    }

    return currentPeople;
  }, [people, sex, query, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !hasError && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!isLoading &&
              !hasError &&
              people.length > 0 &&
              filteredPeople.length === 0 ? (
                <p>There are no people matching the current search criteria</p>
              ) : null}

              {!isLoading && !hasError && filteredPeople.length > 0 && (
                // 3. Pass sort and order props to the table for headers
                <PeopleTable
                  people={filteredPeople}
                  sort={sort}
                  order={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
