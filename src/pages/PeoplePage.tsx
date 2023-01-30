import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { usePeople } from '../hooks/usePeople';

export const PeoplePage = () => {
  const {
    // prettier-ignore
    people,
    isLoading,
    isError,
    isFetching,
  } = usePeople();

  const noPeople = !isLoading && !isFetching && !isError && people.length < 1;

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
              {(isLoading || isFetching) && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {noPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>

              <PeopleTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
