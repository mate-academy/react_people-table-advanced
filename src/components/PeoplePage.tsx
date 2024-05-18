/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { useContext } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleContext } from './PeopleProvider.tsx/PeopleProvider';

export const PeoplePage = () => {
  const { loader, errorFromServer, visiblePeople, query } = useContext(PeopleContext);

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
              {loader ? <Loader /> : <PeopleTable />}
              {!loader && errorFromServer && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!loader &&
                !errorFromServer &&
                query.length === 0 &&
                visiblePeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                    There are no people on the server
                </p>
              )}

              {!loader && visiblePeople.length === 0 && query.length !== 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
