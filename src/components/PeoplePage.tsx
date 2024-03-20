import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { getPreperedPeople } from '../utils/getPreperedPeople';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeopleFromServer)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const people = getPreperedPeople(peopleFromServer, searchParams);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !!peopleFromServer.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {!peopleFromServer.length && !isLoading && !hasError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isLoading && <Loader />}

              {!isLoading && !!people.length && <PeopleTable people={people} />}

              {!isLoading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
