import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const isTableVisible = !isLoading && !hasError && people.length > 0;

  useEffect(() => {
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="box table-container">
            {isLoading && <Loader />}
            {hasError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
            {!isLoading && !hasError && people.length === 0 && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

            {isTableVisible && <PeopleTable people={people} />}
          </div>
        </div>
      </div>
    </div>
  );
};
