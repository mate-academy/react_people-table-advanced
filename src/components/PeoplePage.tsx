import { useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { findParents } from '../utils/findParents';
import { SortParams } from '../types/SortParams';
import { filterPeople } from '../utils/filterPeople';
import { sortPeople } from '../utils/sortPeople';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNoPeople, setHasNoPeople] = useState(false);

  const hasPeople = !!people.length && !hasError;

  const visiblePeople = useMemo(() => {
    const sortParams = searchParams.get(SortParams.Sort);
    const orderParams = searchParams.get(SortParams.Order);

    const filteredPeople = filterPeople(searchParams, [...people]);

    if (!sortParams) {
      return filteredPeople;
    }

    return sortPeople(filteredPeople, sortParams, orderParams);
  }, [searchParams, people]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPeople();

        if (!response.length) {
          setHasNoPeople(true);
        } else {
          setPeople(findParents(response));
        }
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {hasPeople && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {hasNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasPeople && (
                !visiblePeople.length
                  ? (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )
                  : <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
