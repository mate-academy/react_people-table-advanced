import { useContext, useEffect } from 'react';
import { appContext } from '../../storage/AppContext/AppContext';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const {
    visiblePeople, people, isLoading, error, fetchPeople,
  } = useContext(appContext);

  useEffect(() => {
    fetchPeople();
  }, []);

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
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!visiblePeople.length ? (
                <p>There are no people matching the current search criteria</p>
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
