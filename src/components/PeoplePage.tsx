import React, { useContext } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleContext } from './PeopleContext';

export const PeoplePage: React.FC = () => {
  const { people, loader, error } = useContext(PeopleContext);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {people && !loader && <PeopleFilters />}
            </div>

            <div className="column">
              <div className="box table-container">
                {loader && <Loader />}

                {error && !loader && (
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                )}

                {!loader && !people && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {!loader && people && <PeopleTable />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
