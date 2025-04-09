import { useContext } from 'react';
import { peopleContext } from '../context/PeopleContext';

import { Loader } from '../modules/Loader';
import { PeopleFilters } from '../modules/Filter';
import { PeopleTable } from '../modules/Table';

export const PeoplePage = () => {
  const { people, isLoading, hasError } = useContext(peopleContext);

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
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!hasError && people.length > 0 && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
