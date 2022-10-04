import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../api/api';
import { Person } from '../../types';
import { PeopleFilters } from '../PeopleFilters';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const noPeopleCondition = !isLoading && people.length === 0 && !hasError;

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

              {hasError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : (
                <>
                  {noPeopleCondition && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                  {!isLoading && (
                    <PeopleTable
                      people={people}
                    />
                  )}

                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
