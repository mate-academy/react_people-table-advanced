import { PeopleFilters } from './components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from './components/PeopleTable';

import { usePeople } from '../../hooks/usePeople';
import { usePeopleSortParams } from './hooks/usePeopleSortParams';
import { sortPeople } from './utils/sortPeople';
import { Person } from '../../types';

export const PeoplePage = () => {
  const { people, isLoading, hasError } = usePeople();
  const { currentSort, currentOrder } = usePeopleSortParams();

  const sortKey = currentSort as keyof Person;
  const order = currentOrder === 'desc' ? 'desc' : null;

  const sortedPeople = people ? sortPeople({ people, sortKey, order }) : [];

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

              {/* <p>There are no people matching the current search criteria</p> */}
              {people && people?.length >= 1 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
