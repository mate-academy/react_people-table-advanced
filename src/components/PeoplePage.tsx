/* eslint-disable no-nested-ternary */
import { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContext';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const {
    filteredPeople,
    isLoading,
    errorMessage,
    isPeopleEmpty,
  } = useContext(PeopleContext);

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
              {
                isLoading ? (
                  <Loader />
                ) : isPeopleEmpty ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : filteredPeople.length > 0 ? (
                  <PeopleTable />
                ) : (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )
              }

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
