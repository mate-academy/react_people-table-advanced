import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getPeopleWithParents } from '../utils/getPeopleWithParents';
import { getPeoplePrepared } from '../utils/getPeoplePrepared';
import { getSearchWith } from '../utils/searchHelper';
import { Sex } from '../types/FilterOptions';
import { Order, Sort } from '../types/SortOptions';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') as Sex;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') as Sort;
  const order = searchParams.get('order') as Order;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(
        peopleFromServer => setPeople(getPeopleWithParents(peopleFromServer)),
      )
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    return getPeoplePrepared(people, {
      sex, query, centuries, sort, order,
    });
  }, [people, searchParams]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value }),
    );
  };

  const handleSexChange = (selectedSex: string) => {
    setSearchParams(getSearchWith(searchParams, { selectedSex }));
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">

          <div className="column is-7-tablet is-narrow-desktop">
            {(people.length > 0 && !isLoading) && (
              <PeopleFilters
                sex={sex}
                query={query}
                centuries={centuries}
                onSexSelect={handleSexChange}
                onInputChange={handleQueryChange}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {(!isLoading && !hasError && people.length === 0) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(visiblePeople.length === 0 && !isLoading && !hasError) && (
                <p>There are no people matching the current search criteria</p>
              )}

              {(visiblePeople.length !== 0 && !isLoading) && (
                <PeopleTable
                  people={visiblePeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
