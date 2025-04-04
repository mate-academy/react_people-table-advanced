import { PeopleFilters } from './components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from './components/PeopleTable';

import { usePeople } from '../../hooks/usePeople';
import { usePeopleSortParams } from './hooks/usePeopleSortParams';
import { sortPeople } from './utils/sortPeople';
import { Person } from '../../types';
import { usePeopleFilterParams } from './hooks/usePeopleFilterParams';
import { filterPeople } from './utils/filterPeople';
import { SearchParams } from '../../utils/searchHelper';

export const PeoplePage = () => {
  const { people, isLoading, hasError } = usePeople();
  const { currentSort, currentOrder } = usePeopleSortParams();
  const { currentSexFilter, currentCenturiesFilter, currentQueryFilter } =
    usePeopleFilterParams();

  const sortKey = currentSort as keyof Person;
  const order = currentOrder === 'desc' ? 'desc' : null;

  const filter: SearchParams = {
    sex: currentSexFilter,
    centuries:
      currentCenturiesFilter.length > 0 ? currentCenturiesFilter : null,
    query: currentQueryFilter,
  };

  const sortedPeople = people ? sortPeople({ people, sortKey, order }) : [];
  const filteredPeople = sortedPeople.length
    ? filterPeople({ sortedPeople, filter })
    : [];

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people?.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {filteredPeople && filteredPeople?.length >= 1 && (
                <PeopleTable people={filteredPeople} />
              )}

              {!isLoading && !hasError && filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
