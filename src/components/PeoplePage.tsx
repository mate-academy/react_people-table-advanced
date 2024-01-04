import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [isPeopleError, setIsPeopleError] = useState(false);

  useEffect(() => {
    setIsPeopleLoading(true);
    setIsPeopleError(false);

    getPeople()
      .then(peopleList => setPeople(peopleList))
      .catch(() => setIsPeopleError(true))
      .finally(() => setIsPeopleLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isPeopleLoading && <Loader />}

              {isPeopleError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people
              && people.length
              && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
