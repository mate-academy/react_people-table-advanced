import { useContext } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { PeopleContext } from './Context';

export const PeoplePage = () => {
  const {
    filteredPeople,
    allPeople,
    isLoading,
    isError,
  } = useContext(PeopleContext);

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
              {isLoading && <Loader />}
              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!isLoading && allPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

            {!isLoading && !isError && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
