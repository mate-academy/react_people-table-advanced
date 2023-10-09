import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';

import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { getPeople } from '../api';
import { Person } from '../types';
import { useFilterAndOrder } from './useFilterAndOrder';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople().then((data) => {
      setPeople(data);
    }).catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const { filteredPeople, sortedPeople } = useFilterAndOrder(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && !isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              <>
                {error && !isLoading
              && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

                {people.length === 0 && !isLoading && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
                {filteredPeople.length === 0 && !isLoading
                && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              </>

              {people.length > 0 && <PeopleTable people={sortedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
