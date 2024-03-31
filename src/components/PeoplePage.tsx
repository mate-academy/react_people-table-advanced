import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { getPreparedPeople } from '../utils/filterPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const [searchParams] = useSearchParams();

  const visiblePeople = useMemo(() => {
    const options = {
      sex: searchParams.get('sex'),
      query: searchParams.get('query'),
      centuries: searchParams.getAll('centuries'),
      sort: searchParams.get('sort'),
      order: searchParams.get('order'),
    };

    return getPreparedPeople(people, options);
  }, [people, searchParams]);

  useEffect(() => {
    setIsLoadingError(false);
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer))
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const hasSearchMatch =
    !!people.length && !visiblePeople.length && !isLoadingError && !isLoading;

  const isPeopleTable =
    !!people.length && !isLoading && !isLoadingError && !hasSearchMatch;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !isLoadingError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isLoadingError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!people.length && !isLoadingError && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasSearchMatch && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isPeopleTable && (
                <PeopleTable people={people} visiblePeople={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
