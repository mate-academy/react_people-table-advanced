import { useEffect, useState } from 'react';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

import { getPeople } from '../api';

import { ErrorType } from '../types/ErrorType';
import { Person } from '../types';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(ErrorType.NoError);

  useEffect(() => {
    getPeople()
      .then(response => {
        setPeople(response);

        if (response.length === 0) {
          setError(ErrorType.NoPeopleOnServer);
        }
      })
      .catch(() => setError(ErrorType.ServerError))
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
              {isLoading && <Loader />}

              {error === ErrorType.ServerError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {error === ErrorType.NoPeopleOnServer && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {error === ErrorType.NoPeopleMatching && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && error === ErrorType.NoError && (
                <PeopleTable people={people} setError={setError} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
