/* eslint-disable prettier/prettier */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { ErrorMessage } from '../types/ErrorMessage';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [people, setPeople] = useState<Person[]>([]);

  const handleErrorMessage = (error: ErrorMessage | null) => {
    setErrorMessage(error);
  };

  useEffect(() => {
    if (people.length === 0) {
      setIsLoading(true);
      getPeople()
        .then(response => {
          if (response.length === 0) {
            handleErrorMessage(ErrorMessage.NO_PEOPLE_ON_SERVER);
          } else {
            setPeople(response);
          }
        })
        .catch(() => handleErrorMessage(ErrorMessage.OTHER_ERRORS))
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading &&
            errorMessage !== ErrorMessage.OTHER_ERRORS &&
            errorMessage !== ErrorMessage.NO_PEOPLE_ON_SERVER && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {errorMessage === ErrorMessage.NO_PEOPLE_ON_SERVER && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {errorMessage === ErrorMessage.OTHER_ERRORS && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {errorMessage === ErrorMessage.NO_PEOPLE_MATCHING && (
                <p>There are no people matching the current search criteria</p>
              )}
              {!isLoading &&
                errorMessage !== ErrorMessage.OTHER_ERRORS &&
                errorMessage !== ErrorMessage.NO_PEOPLE_ON_SERVER && (
                <PeopleTable
                  people={people}
                  handleErrorMessage={handleErrorMessage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
