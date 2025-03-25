import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useContext, useEffect } from 'react';
import { PeopleContext } from '../store/PeopleContext';
import { useFilters } from '../store/FiltersContext';

export const PeoplePage: React.FC = () => {
  const { loadPeoples, peoples, loading, isDataReady } =
    useContext(PeopleContext);
  const filters = useFilters();

  useEffect(() => {
    loadPeoples();
  }, [loadPeoples]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && isDataReady === true && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && peoples.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && isDataReady === false && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {filters.sortedPeople.length === 0 && !loading ? (
                <p>There are no people matching the current search criteria</p>
              ) : !loading && isDataReady === true ? (
                <PeopleTable peoples={filters.sortedPeople} />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
