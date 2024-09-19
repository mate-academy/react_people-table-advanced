import { useEffect } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { PeopleFilters } from '../PeopleFilters';

import { useValues } from '../store/PeopleContext';
import { ErrorMessages } from '../../types/ErrorMessages';

export const PeoplePage = () => {
  const { people, filteredPeople, isLoading, isError, fetchPeople } =
    useValues();

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  if (isLoading) {
    return <Loader />;
  } else if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {ErrorMessages.PeopleLoadError}
      </p>
    );
  } else if (people.length === 0) {
    return <p data-cy="noPeopleMessage">{ErrorMessages.NoPeopleMessage}</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {filteredPeople.length === 0 ? (
                <p>{ErrorMessages.NoUsersFound}</p>
              ) : (
                <PeopleTable />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
