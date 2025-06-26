import React from 'react';
import { usePeople } from '../../hooks/usePeople';
import { Loader } from '../../components/Loader';
import { PeopleTable } from './components/PeopleTable';
import { PeopleFilters } from './components/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const {
    filteredSortedPeople,
    isLoading,
    errorMessage,
    hasErrorMessage,
    arePeopleLoaded,
    areNoPeopleFromServer,
    areNoPeopleMatchFilters,
  } = usePeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {arePeopleLoaded && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {hasErrorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}
              {areNoPeopleFromServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {areNoPeopleMatchFilters && (
                <p>There are no people matching the current search criteria</p>
              )}
              {arePeopleLoaded && !areNoPeopleMatchFilters && (
                <PeopleTable people={filteredSortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
