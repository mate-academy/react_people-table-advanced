import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleFilters } from '../PeopleFilters';
import { setPeopleWithParents } from '../../utils/setPeopleWithParents';
import { filterPeople } from '../../utils/filterPeople';
import { Error } from '../../types/Error';
import { ErrorMessage } from '../ErrorMessage';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<Error>(Error.NONE);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const loadPeople = useCallback(async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      if (peopleFromServer.length === 0) {
        setError(Error.NOPEOPLE);
      }

      const peopleWithParents = setPeopleWithParents(peopleFromServer);

      setPeople(peopleWithParents);
    } catch {
      setError(Error.ONLOADING);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setError(Error.NONE);
    loadPeople();
  }, []);

  const visiblePeople
    = filterPeople(people, sex, query, centuries, sort, order);

  if (visiblePeople.length === 0) {
    setError(Error.NOMATCHES);
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {error === Error.NONE
                ? (
                  <PeopleTable
                    people={visiblePeople}
                  />
                )
                : (
                  <ErrorMessage error={error} />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* {hasLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(people.length === 0
                && !hasLoadingError && !isLoading) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noMatchingPeople && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )} */
