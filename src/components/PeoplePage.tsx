import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import * as peopleService from '../api';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const getPeoples = () => {
    return peopleService.getPeople()
      .then(peopleFromServer => setPeoples(peopleFromServer))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getPeoples();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {errorMessage && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {!isLoading && peoples.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {peoples.length === 0 && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && (
                <PeopleTable peoples={peoples} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
