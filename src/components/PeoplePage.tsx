import { useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage: React.FC = () => {
  const { personSlug = '' } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isNoPeopleMessageVisible = (
    !isLoading && Boolean(people.length) && !hasError
  );
  const isPeopleVisible = Boolean(people.length) && !isLoading;

  const fetchPeople = useCallback(
    async () => {
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
        setIsLoading(false);
      } catch {
        setHasError(true);
      }

      setIsLoading(false);
    }, [],
  );

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isPeopleVisible && (
              <PeopleFilters />
            )}
          </div>

          {isLoading && (
            <Loader />)}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isPeopleVisible && (
            <PeopleTable
              people={people}
              personSlug={personSlug}
            />
          )}

          {isNoPeopleMessageVisible && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
