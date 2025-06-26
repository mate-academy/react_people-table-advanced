import React, { useContext } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { PeopleContext } from '../../context/PeopleContext';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const { people, isLoading, error } = useContext(PeopleContext);

  const areNoPeopleOnTheServer = !isLoading && people?.length === 0;
  const isPeopleTableVisible = !isLoading && people && people?.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isPeopleTableVisible && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {areNoPeopleOnTheServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isPeopleTableVisible && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
