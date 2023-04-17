import { useEffect, useState } from 'react';

import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';

import { Person } from '../types/Person';
import { getPeopleWithParents } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsInitialized(true);

    getPeopleWithParents()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isLoadSuccess = !isLoading && !hasError && isInitialized;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {isLoadSuccess && !people.length && (
                <p
                  data-cy="noPeopleMessage"
                  className="has-text-centered has-text-weight-bold"
                >
                  There are no people on the server
                </p>
              )}

              {false && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {isLoadSuccess && people.length > 0 && (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
