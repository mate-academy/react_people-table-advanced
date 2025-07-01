import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { usePeople } from '../hooks/usePeople';

export const PeoplePage = () => {
  const {
    visiblePeople,
    isError,
    isNoPeopleOnServer,
    isLoadedPeople,
    isPeopleLoading,
    isNoMatches,
  } = usePeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isLoadedPeople && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isPeopleLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNoMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isLoadedPeople && !isNoMatches && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
