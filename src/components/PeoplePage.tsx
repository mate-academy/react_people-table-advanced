import { useMemo } from 'react';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { filterPeople, sortPeople } from '../utils/peopleUtils';
import { usePeople } from '../hooks/usePeople';
import { useSearchFilters } from '../hooks/useSearchFilters';

export const PeoplePage = () => {
  const { people, isLoading, error } = usePeople();
  const filters = useSearchFilters();

  const filteredPeople = useMemo(() => {
    const filtered = filterPeople(people, {
      sex: filters.sex,
      query: filters.query,
      centuries: filters.centuries,
    });

    return sortPeople(filtered, filters.sort, filters.order);
  }, [people, filters]);

  const showFilters = people.length > 0 && !isLoading;
  const noPeopleOnServer = !isLoading && people.length === 0;
  const noMatches = people.length > 0 && filteredPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {showFilters && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {noPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {people.length > 0 && <PeopleTable people={filteredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
