import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable';

import { usePeople } from '../../hooks/usePeople';

export const PeoplePage = () => {
  const { people, error, loading, filteredPeople } = usePeople();

  const succesfullyLoadedStatus = !!people.length && !loading;
  const isNoFilteredPeople = !filteredPeople.length && succesfullyLoadedStatus;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {succesfullyLoadedStatus && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!people.length && !error && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNoFilteredPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {succesfullyLoadedStatus && (
                <PeopleTable visiblePeople={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
