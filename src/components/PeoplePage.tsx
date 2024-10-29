import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingError, setFetchingError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setFetchingError(false);

    getPeople()
      .then(fetchedPeople => setPeople(fetchedPeople))
      .catch(() => setFetchingError(true))
      .finally(() => setIsLoading(false));
  }, []);

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
                <PeopleTable people={people} isLoading={isLoading} />
              )}

              {/* <p>There are no people matching the current search criteria</p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
