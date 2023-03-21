import { useCallback, useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [listPeople, setListPeople] = useState<Person[]>([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((res: Person[]) => {
        if (!res.length) {
          setIsError(true);
        }

        setListPeople(res);
      })
      .catch(() => setIsError(true))
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
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {isError && (
                    <p data-cy="peopleLoadingError">
                      Something went wrong
                    </p>
                  )}
                  {!listPeople.length && isError && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                  {isNotFound && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}
                  <PeopleTable
                    listPeople={listPeople}
                    setNotFound={handleSetNotFound}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
