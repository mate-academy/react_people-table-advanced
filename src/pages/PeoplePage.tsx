import { useEffect, useState } from 'react';

import { Person } from '../types';

import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';

import { getPeople } from '../api';
import { getVisiblePeople } from '../utils/getVisiblePeople';
import { useFilter } from '../hooks/useFilter';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { nameQuery, sex, centuries, sort, order } = useFilter();

  const visiblePeople = getVisiblePeople(people, {
    nameQuery,
    sex,
    centuries,
    sort,
    order,
  });

  const isDataLoaded = !isLoading && !isError && !!visiblePeople.length;

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !isError && !!people.length && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !isError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isDataLoaded && <PeopleTable people={visiblePeople} />}

              {!visiblePeople.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
