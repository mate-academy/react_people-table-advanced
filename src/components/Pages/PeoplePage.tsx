import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { useContext } from 'react';
import { PeopleContext } from '../../contexts/PeopleContext';
import { ErrorType } from '../../types/ErrorType';

export const PeoplePage = () => {
  const { isLoading, isError } = useContext(PeopleContext);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {isError === ErrorType.LOADING_ERRROR && (
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                )}

                {isError === ErrorType.NO_PEOPLE_ERROR && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {isError === ErrorType.NO_MATCHES && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

                {!isError && <PeopleTable />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
