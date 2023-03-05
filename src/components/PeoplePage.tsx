import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [displayedPeople, setDisplayedPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(setDisplayedPeople)
      .catch(() => setHasLoadingError(true))
      .finally(() => setIsLoading(false));
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
              <p>There are no people matching the current search criteria</p>

              <PeopleTable
                isLoading={isLoading}
                hasLoadingError={hasLoadingError}
                displayedPeople={displayedPeople}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
