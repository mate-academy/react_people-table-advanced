import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { usePeople } from './PeopleContext';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const { peopleFromServer, setPeopleFromServer, setVisiblePeople } =
    usePeople();

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeopleFromServer(data);
        setVisiblePeople(data);
      })
      .catch(() => setErrorMessage(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !errorMessage && peopleFromServer.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !errorMessage && peopleFromServer.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
