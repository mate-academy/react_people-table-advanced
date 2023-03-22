import { useCallback, useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

function isNetworkError(error: Error) {
  const message = error.message.toLowerCase();

  return message.includes('network')
    || message.includes('connection')
    || message.includes('offline');
}

export const PeoplePage = () => {
  const [listPeople, setListPeople] = useState<Person[]>([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((res: Person[]) => {
        if (!res.length) {
          setIsNotFound(true);
        }

        setListPeople(res);
      })
      .catch((err: Error) => setFetchError(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSetNotFound = useCallback((value: boolean) => {
    setIsNotFound(value);
  }, []);

  return (
    <>
      <h1 className="title">
        People Page
      </h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {fetchError && (
                <p data-cy="peopleLoadingError">
                  {isNetworkError(fetchError)
                    ? 'Network error. Please check your internet connection'
                    : `Something went wrong: ${fetchError.message}`}
                </p>
              )}

              {!isNotFound
                && listPeople?.length === 0
                && !fetchError
                && !isLoading
                && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

              {isNotFound && !fetchError && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {listPeople?.length > 0 && (
                <PeopleTable
                  listPeople={listPeople}
                  setNotFound={handleSetNotFound}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
