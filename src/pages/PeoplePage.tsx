import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleContext } from '../store/PeopleContext';
import React from 'react';

export const PeoplePage = () => {
  const { peopleLoading, peopleError, empty } = React.useContext(PeopleContext);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!peopleLoading && !peopleError && !empty && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {peopleLoading && <Loader />}

              {peopleError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {empty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!peopleLoading && !peopleError && !empty && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
