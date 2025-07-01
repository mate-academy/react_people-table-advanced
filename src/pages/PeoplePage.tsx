import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { usePeople } from '../hooks/usePeople';

export const PeoplePage = () => {
  const { isLoading, isError, isEmptyPeople, slug, ageGroup, visiblePeople } =
    usePeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isLoading || <PeopleFilters ageGroup={ageGroup} />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isEmptyPeople && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isLoading ? (
                <Loader />
              ) : (
                <PeopleTable
                  slugFromParam={slug}
                  visiblePeople={visiblePeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
