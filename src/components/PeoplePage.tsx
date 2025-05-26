import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        {isLoading ? (
          <Loader />
        ) : hasError ? (
          <p data-cy="peopleLoadingError">Something went wrong</p>
        ) : people.length === 0 ? (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        ) : (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {people.length > 0 ? (
                  <PeopleTable people={people} />
                ) : (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>

  );
};
