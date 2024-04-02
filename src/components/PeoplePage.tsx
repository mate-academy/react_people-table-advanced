import React, { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { peopleWithPerents } from '../utils/peopleWithParents';
import { usePreparedPeople } from '../hooks/usePreparedPeople';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setHasError(false);

    getPeople()
      .then(data => setPeople(peopleWithPerents(data)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const prepearedPeople = usePreparedPeople(people);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !!people.length && !hasError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !prepearedPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!prepearedPeople.length && (
                <PeopleTable people={prepearedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
