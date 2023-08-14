import { useContext, useEffect } from 'react';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleContext } from '../context/PeopleContext';

export const PeoplePage = () => {
  const {
    peopleError,
    peopleLoading,
    peoples,
    loadPeople,
  }
  = useContext(PeopleContext);

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!peopleLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {peopleError && <p data-cy="peopleLoadingError">{peopleError}</p>}
              {peopleError && peoples.length === 0 && (
                <p data-cy="noPeopleMessage">{peopleError}</p>
              )}
              {peopleLoading && !peopleError ? <Loader /> : <PeopleTable />}
              {peoples.length === 0 && !peopleError && !peopleLoading && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
