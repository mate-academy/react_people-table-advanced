import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then((data) => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isLoading || <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              { isLoading
                ? <Loader />
                : error && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

              { (!error && people.length === 0 && !isLoading) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(!error && !!people.length && !isLoading)
          && <PeopleTable people={people} />}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
