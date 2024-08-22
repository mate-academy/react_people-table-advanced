import { useEffect } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { PeopleFilters } from '../PeopleFilters';

import { useValues } from '../store/PeopleContext';
import { ErrorMessages } from '../../types/ErrorMessages';

export const PeoplePage = () => {
  const { people, isLoading, isError, fetchPeople } = useValues();

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

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

              {!isLoading && !people.length && (
                <p data-cy="noPeopleMessage">{ErrorMessages.NoPeopleMessage}</p>
              )}

              {!isLoading && <PeopleTable />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text=danger">
                  {ErrorMessages.PeopleLoadError}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
