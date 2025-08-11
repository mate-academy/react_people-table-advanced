import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useState, useEffect } from 'react';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
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

                {!isLoading && error && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {!isLoading && people.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {!isLoading && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
